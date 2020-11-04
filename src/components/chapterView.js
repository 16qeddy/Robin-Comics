import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/chapterView.css';

let ChapterView = (props) => {

  return (
    <div className="chapters">
      <Carousel data-interval="false">
        {props.chapter.map((page) => {
          return (<Carousel.Item>
            <img className="image" src={page.image}></img>
          </Carousel.Item>)
        })}
      </Carousel>
    </div>
  )
}

export default ChapterView;