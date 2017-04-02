import React, { Component } from 'react';
import './App.css';

class Slider extends Component{

  constructor(props){
    super(props);
    this.state = {
      prevPhotoIndex: this.props.data.length - 1,
      currentPhotoIndex: 0,
      nextPhotoIndex: 1,
      modalImageDisplayed: false,
      animateSlideForward: false,
      animateSlideBackward: false
    }

    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.hideShowFullPictureModal = this.hideShowFullPictureModal.bind(this);
  }

  advanceThumbnail(){
    if(this.state.nextPhotoIndex < this.props.data.length - 1){
      this.setState({
        prevPhotoIndex: (this.state.currentPhotoIndex),
        currentPhotoIndex: (this.state.nextPhotoIndex),
        nextPhotoIndex: (this.state.nextPhotoIndex + 1),
        animateSlideForward: false})
    } else {
      this.setState({
        prevPhotoIndex: (this.state.currentPhotoIndex),
        currentPhotoIndex: (this.state.nextPhotoIndex),
        nextPhotoIndex: 0,
        animateSlideForward: false})
    }
  }

  reverseThumbnail(){
    if(this.state.prevPhotoIndex > 0){
      this.setState({
        prevPhotoIndex: (this.state.prevPhotoIndex - 1),
        currentPhotoIndex: (this.state.prevPhotoIndex),
        nextPhotoIndex: (this.state.currentPhotoIndex),
        animateSlideBackward: false})
    } else {
      this.setState({
        prevPhotoIndex: (this.props.data.length - 1),
        currentPhotoIndex: (this.state.prevPhotoIndex),
        nextPhotoIndex: (this.state.currentPhotoIndex),
        animateSlideBackward: false})
    }
  }

  handleNextClick(){
    //this renders new Picture on top of current Picture, then removes current Picture
    this.animateThumbnail("forward");
    setTimeout(() => {this.advanceThumbnail()}, 333);
  }

  handlePrevClick(){
    this.animateThumbnail("backward");
    setTimeout(() => {this.reverseThumbnail()}, 333);
  }

  animateThumbnail(direction){
    if (direction === "forward"){
      this.setState({animateSlideForward: true})
    } else {
      this.setState({animateSlideBackward: true})
    }
  }

  hideShowFullPictureModal(){
    this.setState({modalImageDisplayed: !this.state.modalImageDisplayed})
  }



  render(){
    const modalHiddenState = (this.state.modalImageDisplayed)? "shown" : "hidden"
    const forwardAnimation = (this.state.animateSlideForward)? "slide-animation " : ""
    const backAnimation = (this.state.animateSlideBackward)? "slide-animation-reverse " : ""
    const images = this.props.data
    const currentIndex = this.state.currentPhotoIndex
    const nextIndex = this.state.nextPhotoIndex
    const prevIndex = this.state.prevPhotoIndex
    const currentPicture =
      <Picture
        className="modal-image"
        src={images[currentIndex].src}
        alt={images[currentIndex].desc}
        title={images[currentIndex].title}/>

    const nextThumb =
      <div>
        <div className="buffer"></div>

      <Picture
        className={"thumb " + forwardAnimation}
        src={images[nextIndex].thumb}
        alt={images[nextIndex].desc}
        index={nextIndex}/>
      </div>

    const currentThumb =
      <div onClick={this.hideShowFullPictureModal}>
        <Picture
        className="thumb"
        src={images[currentIndex].thumb}
        index={currentIndex}
        alt={images[currentIndex].desc}
        title={images[currentIndex].title}/>
      </div>

    const prevThumb =
      <div>
        <div className="buffer"></div>
        <Picture
        className={"thumb " + backAnimation}
        src={images[prevIndex].thumb}
        alt={images[prevIndex].desc}
        index={prevIndex}/>
      </div>

    return(
     <div className="image-slider-main">
       <div
         className={"modal-image-container " + modalHiddenState}
         onClick={this.hideShowFullPictureModal}>
         {currentPicture}
      </div>

      <div className="slider-elements">
        {nextThumb}
        {currentThumb}
        {prevThumb}
      </div>
      <button className="btn btn-secondary "
        onClick={this.handlePrevClick}>
        <span className="glyphicon glyphicon-triangle-left"></span>
        </button>
      <button className="btn btn-seconary "
        onClick={this.handleNextClick}>
        <span className="glyphicon glyphicon-triangle-right"></span>

      </button>


    </div>
    )
  }
}

class Picture extends Component{
  render(){
    return(
      <div className={this.props.className}>
        <h2>{this.props.title}</h2>
        <img src={this.props.src} alt={this.props.desc}/>
      </div>
    )
  }
}


export default Slider;
