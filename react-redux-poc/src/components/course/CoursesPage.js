import * as courseActions from "../../actions/CourseActions";

import React from "react";
import {connect} from "react-redux";
import {Link, IndexLink} from "react-router";

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: {
        title: ""
      }
    };

    this.onClickSave = this.onClickSave.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);

  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course});
  }

  onClickSave() {
    console.log("onClickSave: ", this.state.course);
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  courseRow(course, index) {
    return (
      <div key={index}>
        {course.title}</div>
    );

  }

  render() {

    return (
      <div>
        <h1>Course</h1>
        {this.props.courses.map(this.courseRow)}
        <input type="text" onChange={this.onTitleChange} value={this.state.course.title}/>
        <input type="submit" value="Save" onClick={this.onClickSave}/>
      </div>
    );

  }
}

function mapStateToProps(state) {

    debugger;
  return {courses: state.courses};
}

export default connect(mapStateToProps)(CoursesPage);
