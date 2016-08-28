import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.state = {
    //   course: {title: ' '}
    // };
    // this.onTitleChange = this.onTitleChange.bind(this);
    // this.onClickSave = this.onClickSave.bind(this);
  }

  // onTitleChange(event) {
  //   const course = this.state.course;
  //   course.title = event.target.value;
  //   this.setState({course: course})
  // }

  // onClickSave(event) {
  //   this.props.actions.createCourse(this.state.course)
  // }


  render() {
    const courses = this.props.courses;
    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// connect returns a function, which we then invoke with an arg of CoursesPage
// iif!! | kind of like elixir piping

function mapStateToProps(state, ownProps) {
  // state means redux store state
  // means our component has this.props.courses
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);



// connect only add dispatch property onto component if you DON"T define mapDispatchToProps function. If you do define that function, no dispatch property on component

