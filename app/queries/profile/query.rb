class Profile::Query
  def query(student)

    store = {
      ids: [],
      sessions: []
    }

    finished_sessions = student.activity_sessions
                        .where(state: "finished")
                        .sort_by {|s| s.percentage}
                        .reverse

    classroom_ids = finished_sessions.map{|s| s.classroom_activity_id}.uniq

    other_sessions = student.activity_sessions.where("classroom_activity_id NOT IN (?)", classroom_ids)

    sessions = finished_sessions + other_sessions

    sessions.each do |s|
      unless store[:ids].include?(s.classroom_activity_id)
        store[:ids].push(s.classroom_activity_id)
        store[:sessions].push(s)
      end
    end
    puts store[:sessions]
    return store[:sessions]
  end

end