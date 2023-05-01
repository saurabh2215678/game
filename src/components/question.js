import React, { useEffect, useRef, useState } from "react";
import Countdown from 'react-countdown';
import logoImg from '../assets/images/logo.png';
import {CircularProgressbar,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "./button";
import DraggableItem from "./draggable-item";
import fillBlank from '../assets/images/fill_blank.png'


function secondsToArray(sec){
    var secondsArray = [];
    for(let percentage = sec; percentage >= 0; ){
        var percentageValue = percentage * 100 / sec
        secondsArray.push(percentageValue);
        percentage--
    }
    return secondsArray;
}

const Questions = ({
    data, 
    setResults, 
    results, 
    setquestionIndex, 
    questionIndex,
    lavel
}) => {

    const [answerMarked, setAnswerMarked] = useState(null);
    const [time, setTime] = useState();
    const countdownRef = useRef();
    const constraintsRef = useRef(null);
    const matchConstraintsRef = useRef(null);
    const fillBlanksRefs = useRef({});
    const [fillInTheBlanksResults, setFillInTheBlanksResults] = useState({});
    
    useEffect(()=>{
        var nowDate = Date.now() + (data['time-remaining'] * 1000)
        setTime(nowDate);        
    },[]);

    

    useEffect(()=>{
        setTime(Date.now() + (data['time-remaining'] * 1000));
        countdownRef?.current?.start();
    },[data]);

const handleNext = () => {
    data.passed = true;
    data.lavel = lavel;
    if(data.type == "true-false"){
        data['user-answer'] = answerMarked;
        data['user-answer-is'] = answerMarked == data['correct-answer']  ? 'correct' :
                                 answerMarked != null ? 'incorrect' : 'not attempted';
    }
    
    if(data.type == "fill-in-the-blanks"){
        const userAns = Object.values(fillInTheBlanksResults);
        data['user-answer'] = userAns;
        data['user-answer-is'] = JSON.stringify(userAns) == JSON.stringify(data['correct-answer'])  ? 'correct' :
                                [...userAns] != null ? 'incorrect' : 'not attempted';
    }

    data['viewed-time'] = Date.now();
    const dataResult = results.find((result)=> result.id == data.id);
    if(!dataResult){
        setResults([...results, data]);
        setquestionIndex(questionIndex + 1);
    }
    setAnswerMarked(null);
}

const percentageValue = (i) => {
    return secondsToArray(data['time-remaining'])[i];
}

const handleFilled = (index) =>{
    if(fillInTheBlanksResults[index]){
        return 'filled';
    }else{
        return 'not-filled';
    }
}

    return(
        <div className={`question_root ${data.type}`}>
            <div className="container">
                <div className="logo_wrapper">
                    <a href="#" className="logo">
                        <img src={logoImg} alt="" />
                    </a>
                </div>

                <div className="text-center top_rrm">
                    <h4 className="font52 fw900 color_theme">
                        {
                            data.type == "true-false" ? 'TRUE or FALSE' :
                            data.type == "fill-in-the-blanks" ? 'Fill in the blanks' : 'MATCH THE FOLLOWING'
                        }
                    </h4>
                    {time && <Countdown 
                        ref={countdownRef}
                        date={time} 
                        renderer={props => 
                            <div className="timer_wrapper">
                                <CircularProgressbar
                                    value={percentageValue(props.total / 1000)}
                                    styles={buildStyles({
                                    pathTransitionDuration: 0.15
                                    })}
                                />
                                <div className="couter-time">
                                    <span className="color_theme font19">{props.total / 1000}</span>
                                    <br/>Sec
                                </div>
                            </div>
                                
                            }
                        onComplete={handleNext}
                    />}
                    
                </div>
                {data.type == "fill-in-the-blanks" &&
                    <p className="font29 text-center color_dark ttp_txt">Fill the blanks with the most appropriate word in the following statements:</p>
                }
                {data.type == "match-following" &&
                    <p className="font29 text-center color_dark ttp_txt">Match the following behaviours with their categories of disrespect and abuse:</p>
                }
                <div className="box mt-4">
                    <div className="questionBox p-5">
                        {data.type == "true-false" &&
                        <>
                            <h3 className="text-center font42 fw700 color_theme" dangerouslySetInnerHTML={{__html: data.question}}></h3>
                            <div className="true-false">
                                <div onClick={()=>setAnswerMarked(true)} className={`btn font38 ${answerMarked == true ? 'active' : ''}`}>
                                    <div className="btn_bg"></div>
                                    <span>True</span>
                                </div>
                                <div onClick={()=>setAnswerMarked(false)} className={`btn font38 ${answerMarked == false ? 'active' : ''}`}>
                                    <div className="btn_bg"></div>
                                    <span>False</span>
                                </div>
                            </div>
                        </>}

                        {data.type == "fill-in-the-blanks" &&
                        <>
                            <h3 className="font31 fw800 color_theme text-center mb-4 pb-2">Select and drop the appropriate word from the<br/>boxes below.</h3>
                            <div className="fill-in-the-blanks" ref={constraintsRef}>
                                <ul className="fill_list">
                                    {data.question.map((question, index)=> 
                                        <li key={index}>
                                            {question.split('_____')[0]}
                                            <div className={`item_box ${handleFilled(index)}`} ref={ref => fillBlanksRefs.current[index] = ref}>
                                                <img className="fill_blank" src={fillBlank}/>
                                            </div>
                                            {question.split('_____')[1]}
                                        </li>
                                    )}
                                </ul>

                                <ul className="options">
                                    {data['arrangement'].map((answer, index)=> 
                                        <DraggableItem 
                                            key={index} 
                                            answer={answer} 
                                            index={index} 
                                            fillBlanksRefs={fillBlanksRefs}
                                            fillInTheBlanksResults= {fillInTheBlanksResults}
                                            setFillInTheBlanksResults= {setFillInTheBlanksResults}
                                        />
                                    )}
                                </ul>
                            </div>
                        </>
                        }

                        {data.type == "match-following" &&
                        <>
                            <h3 className="font31 fw800 color_theme text-center mb-4 pb-2">Drag the number and drop it in front of the correct category.</h3>
                            <div className="match-following" ref={matchConstraintsRef}>
                                <ul className="fill_list list-left">
                                    {data.question.map((question, index)=> 
                                        <li key={index}>
                                            {question}
                                            {/* <div className={`following_ ${handleFilled(index)}`} ref={ref => fillBlanksRefs.current[index] = ref}>
                                                <img className="fill_blank" src={fillBlank}/>
                                            </div> */}
                                        </li>
                                    )}
                                </ul>

                                <ul className="fill_list list-right">
                                    {data['arrangement'].map((answer, index)=> 
                                        <DraggableItem 
                                            key={index} 
                                            answer={answer} 
                                            index={index} 
                                            fillBlanksRefs={fillBlanksRefs}
                                            fillInTheBlanksResults= {fillInTheBlanksResults}
                                            setFillInTheBlanksResults= {setFillInTheBlanksResults}
                                        />
                                    )}
                                </ul>
                            </div>
                        </>
                        }
                    </div>
                </div>

                <div className="text-center pt-3 mt-5 mb-4">
                    <Button onClick={handleNext} className="btn pink_btn font32">Next</Button>
                </div>
            </div>
        </div>
    )
}
export default Questions;