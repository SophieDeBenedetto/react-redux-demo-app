import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr'; 

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    const course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => {this.redirect()});

  } 

  onDelete(event) {
    this.props.actions.deleteCourse(this.state.course)
      .then(() => {this.redirect()});
  }

  redirect() {
    debugger;
    this.setState({saving: true});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm 
        errors={this.state.errors}
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        onDelete={this.onDelete}
        saving={this.state.saving} />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  // this gives us context for the router. context used by react router to provide easy access to the data we need
  router: PropTypes.object
};

function getCourseById(courses, id) {
  let course = courses.filter(course => course.id == id);
  if (course) {
    return course[0];
  } else {
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  const courseId = ownProps.params.id;
  if (courseId && state.courses.length > 0) {
    var currentCourse = getCourseById(state.courses, courseId);
    if (currentCourse) {
      course = currentCourse
    }
  }

  const authorsFormattedForDropdown = state.authors.map(author =>{
    return {value: author.id, text: author.firstName + ' ' + author.lastName};
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// changes to props dont' change state. later when ajax call completes, this.props.course is updated, but we set state to course, pass state to child component. finish ajax won't change this component's state.

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
