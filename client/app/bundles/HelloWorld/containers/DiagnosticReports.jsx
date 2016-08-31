import React from 'react'
import {Router, Route, Link, hashHistory} from 'react-router'
import Index from '../components/progress_reports/diagnostic_reports/index.jsx'
import createHashHistory from 'history/lib/createHashHistory'
import StudentReport from '../components/progress_reports/diagnostic_reports/student_report.jsx'
import ClassReport from '../components/progress_reports/diagnostic_reports/class_report.jsx'
import QuestionReport from '../components/progress_reports/diagnostic_reports/question_report.jsx'
import ActivityPacks from '../components/progress_reports/diagnostic_reports/activity_packs.jsx'
const hashhistory = createHashHistory({queryKey: false})

export default React.createClass({

	render: function() {
		return (
			<Router history={hashhistory}>
				<Route path="/" component={Index}>
					<Route path=':activityId/:classroomId/student_report' component={StudentReport}/>
					<Route path=':activityId/:classroomId/student_report/:studentId' component={StudentReport}/>
					<Route path=':activityId/:classroomId/students' component={ClassReport}/>
					<Route path=':activityId/:classroomId/questions' component={QuestionReport}/>
					<Route path='activity_packs' component={ActivityPacks}/>
				</Route>
			</Router>
		);
	}
});