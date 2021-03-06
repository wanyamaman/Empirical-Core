require 'rails_helper'
include AsyncHelper

feature 'Standards: All Classrooms Progress Report', js: true do
  before(:each) { vcr_ignores_localhost }

  let(:report_page) { Teachers::ClassroomsProgressReportPage.new }

  include_context 'Topic Progress Report'

  context 'for a logged-in teacher' do
    before do
      sign_in_user teacher
      report_page.visit
    end

    skip 'displays the right headers' do
      expect(report_page.column_headers).to eq(
        [
          'Class Name',
          '',
          '',
          'Students',
          'Proficient',
          'Not Yet Proficient',
          'Standards'
        ]
      )
    end

    skip 'displays activity session data in the table' do
      expect(report_page.table_rows.first).to eq(
        [
          full_classroom.name,
          'Sort by Student',
          'Sort by Standard',
          visible_students.size.to_s,
          "#{proficient_students.size} students",
          "#{not_proficient_students.size} students",
          visible_topics.size.to_s
        ]
      )
    end

    skip 'links to the Student View for a classroom' do
      report_page.click_student_view(0)
      eventually { expect(report_page).to have_text('Standards by Student') }
    end

    # it 'can export a CSV' do
    #   report_page.export_csv
    # end
  end
end
