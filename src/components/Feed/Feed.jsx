import React, {PropTypes} from 'react'
import moment from 'moment'
import cn from 'classnames'
import ActionCard from '../ActionCard/ActionCard'
import Panel from '../Panel/Panel'
import FeedComments from './FeedComments'
import { Avatar } from 'appirio-tech-react-components'
import {Link} from 'react-router'
import CommentEditToggle from '../ActionCard/CommentEditToggle'
import RichTextArea from '../RichTextArea/RichTextArea'

class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editTopicMode: false}
    this.onEditTopic = this.onEditTopic.bind(this)
    this.cancelEditTopic = this.cancelEditTopic.bind(this)
    this.onTopicChange = this.onTopicChange.bind(this)
    this.onSaveTopic = this.onSaveTopic.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({editTopicMode: nextProps.editTopicMode})
  }

  onEditTopic() {
    this.setState({editTopicMode: true})
    this.props.onTopicChange(this.props.topicMessage.id, null, null, true)
  }
  cancelEditTopic() {
    this.setState({editTopicMode: false})
    this.props.onTopicChange(this.props.topicMessage.id, null, null, false)
  }
  onTopicChange(title, content) {
    this.props.onTopicChange(this.props.topicMessage.id, title, content, true)
  }
  onSaveTopic({title, content}) {
    this.props.onSaveTopic(this.props.topicMessage.id, title, content)
  }

  render() {
    const {
      user, currentUser, date, topicMessage, totalComments, hasMoreComments, onLoadMoreComments, isLoadingComments,
      allowComments, comments, unread, children, onNewCommentChange, onAddNewComment, isAddingComment, onSaveMessageChange,
      onSaveMessage, isSavingTopic, onDeleteMessage, onDeleteTopic, isDeletingTopic, error, permalink
    } = this.props
    const {editTopicMode} = this.state
    let authorName = user.firstName
    if (authorName && user.lastName) {
      authorName += ' ' + user.lastName
    }
    const self = user && user.userId === currentUser.userId
    const title = this.props.newTitle === null || this.props.newTitle === undefined ? this.props.title : this.props.newTitle
    const content = topicMessage.newContent === null || topicMessage.newContent === undefined ? topicMessage.content : topicMessage.newContent
    return (
      <ActionCard>
        {editTopicMode && (
        <RichTextArea
            editMode
            title={title}
            content={content}
            oldTitle={this.props.title}
            oldContent={topicMessage.content}
            onPost={this.onSaveTopic}
            onPostChange={this.onTopicChange}
            isCreating={isSavingTopic}
            hasError={error}
            avatarUrl={user.photoURL}
            authorName={authorName}
            cancelEdit={this.cancelEditTopic}
        />
        )}
        {!editTopicMode && (
        <Panel.Body className={cn({active: unread})}>
          <div className="portrait">
            <Avatar avatarUrl={user.photoURL} userName={authorName} />
          </div>
          <div className="object">
            <div className="card-title">
              <div>{title}</div>
              {self && (
                <CommentEditToggle
                  forTopic
                  hideDelete={comments.length > 0}
                  onEdit={this.onEditTopic}
                  onDelete={onDeleteTopic}
                />
              )}
            </div>
            <div className="card-profile">
              <div className="card-author">
                { authorName }
              </div>
              <div className="card-time">
                <Link to={permalink}>{moment(date).fromNow()}</Link>
              </div>
            </div>
            <div className="card-body draftjs-post" dangerouslySetInnerHTML={{__html: topicMessage.content}} />
          </div>
        </Panel.Body>
        )}
        <FeedComments
          allowComments={allowComments}
          totalComments={totalComments}
          hasMoreComments={hasMoreComments}
          onLoadMoreComments={onLoadMoreComments}
          onNewCommentChange={onNewCommentChange}
          onAddNewComment={onAddNewComment}
          isLoadingComments={isLoadingComments}
          currentUser={currentUser}
          avatarUrl={currentUser.photoURL}
          comments={comments}
          isAddingComment={isAddingComment}
          onSaveMessageChange={onSaveMessageChange}
          onSaveMessage={onSaveMessage}
          onDeleteMessage={onDeleteMessage}
        />
        {children}
        {isDeletingTopic &&
        <div className="editing-layer">
          <div>Deleting...</div>
        </div> 
        }
      </ActionCard>
    )
  }
}

Feed.propTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  topicMessage: PropTypes.any.isRequired,
  allowComments: PropTypes.bool.isRequired,
  hasMoreComments: PropTypes.bool,
  comments: PropTypes.array,
  children: PropTypes.any,
  onLoadMoreComments: PropTypes.func.isRequired,
  onNewCommentChange: PropTypes.func.isRequired,
  onAddNewComment: PropTypes.func.isRequired,
  onSaveMessageChange: PropTypes.func.isRequired,
  onSaveMessage: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
  onTopicChange: PropTypes.func.isRequired,
  onSaveTopic: PropTypes.func.isRequired,
  onDeleteTopic: PropTypes.func.isRequired,
  isAddingComment: PropTypes.bool,
  isSavingTopic: PropTypes.bool
}

export default Feed
