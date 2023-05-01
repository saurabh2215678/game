import React, { useEffect, useRef, useState } from "react";
import { ReactSVG } from 'react-svg';
import logoImg from '../assets/images/logo.png';
import looseSvg from '../assets/images/oops.svg';
import winSvg from '../assets/images/wow.svg';
import Button from "./button";

const Result = ({results, setShowResult, completed}) => {

    const [passed, setPassed] = useState(false);
    const questionRef = useRef();
    const [questionWidth, setQuestionWidth] = useState(0);
    var lastLabel = results[results.length - 1].lavel;
    var thisLavelResults = results.filter((item)=>item.lavel == lastLabel);
    var isCorrect = !thisLavelResults.find((item)=> item['user-answer-is'] != 'correct');

    useEffect(()=>{
        if(questionRef?.current?.offsetWidth){
            setQuestionWidth(questionRef?.current?.offsetWidth);
        }
    },[]);
    
    window.addEventListener("resize",  function(){
        if(questionRef?.current?.offsetWidth){
            setQuestionWidth(questionRef?.current?.offsetWidth)
        }
    });
    useEffect(()=>{
        console.log(results);
        if(isCorrect){
            setPassed(true);
        }
    },[results]);

    const passedText = () => {
        return lastLabel == 1 ? 'You truly understand the importance of accountability in healthcare.':
                                        lastLabel == 2 ? 'You understand the manifestation<br/> of workplace stress in healthcare<br/> services.':
                                                            'You are fully aware of the categories of disrespect and abuse'
    }
   
    const failedText = () => {
        return lastLabel == 1 ? 'Oops! you missed some.':
                                        lastLabel == 2 ? 'Oh No! Seems like you got<br/> something wrong. ':
                                                            'Sorry, something didn’t match!'
    }
    
    return(
        <div className={`result_root ${passed ? 'passed': 'failed'}`}>
            <div className="container">
                <div className="logo_wrapper">
                    <a href="#" className="logo">
                        <img src={logoImg} alt="" />
                    </a>
                </div>
                <div className="result_box">
                        {passed ?
                        <>
                            <div className="passed">
                                <div className="text-center">
                                    <ReactSVG src={winSvg} className='result_icon'/>
                                    <h3 className="font34 color_theme mb-5 fw900">
                                        {lastLabel == 1 ? 'Wow! You are right.':
                                        lastLabel == 2 ? 'Yay! You’re absolutely right.': 'Wohoo! You are a great match!' 
                                        }
                                    </h3>
                                    <p className="font37 fw800 color_dark passed_txt" dangerouslySetInnerHTML={{__html: passedText()}}></p>
                                </div>
                                {completed ?
                                <div className="text-center my-4"><Button onClick={()=>window.location.reload()} className="btn pink_btn font32">Done</Button></div> :
                                <div className="text-center my-4"><Button onClick={()=>setShowResult(false)} className="btn pink_btn font32">Next Quiz</Button></div>}
                            </div> 
                        </>
                        :
                        <>
                            <div className="text-center">
                                <ReactSVG src={looseSvg} className='result_icon'/>
                                <h3 className="font34 color_theme mb-5 fw900" dangerouslySetInnerHTML={{__html: failedText()}}></h3>
                                {lastLabel == 1 &&  <p className="font29 mb-4">Here are the correct answers.</p>}
                            </div>
                            <div className="box_wrapeer">
                                {(thisLavelResults[0]['lavel'] == 2) ?
                                    <div>
                                        <div className="box">
                                            <div className="questionBox">
                                                <h3 class="font31 fw800 color_theme text-center mb-4 pb-2">Here are the correct answers.</h3>
                                                <div className="fill-in-the-blanks">
                                                    <ul className="fill_list">
                                                        {thisLavelResults[0]['question'].map((item, i)=> 
                                                            <li key={i}>
                                                                {item.split('_____')[0]}
                                                                <span>{thisLavelResults[0]['correct-answer'][i]}</span>
                                                                {item.split('_____')[1]}
                                                            </li>
                                                        )}
                                                        
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div> : (thisLavelResults[0]['lavel'] == 3) ?

                                    <div>
                                        match following
                                    </div> :
                                    <div className="box">
                                        <div className="result-table" style={{ '--qwidth' :  `${questionWidth}px`}}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th ref={questionRef}>Questions</th>
                                                        <th>Answer</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        thisLavelResults.map((item, i)=> 
                                                        <tr key={i}>
                                                            <td dangerouslySetInnerHTML={{__html: item.question}}></td>
                                                            <td><div>{item["correct-answer"] ? 'true' : 'false'}</div></td>
                                                        </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                            </div>
                            {completed ?
                            <div className="text-center my-4"><Button onClick={()=>window.location.reload()} className="btn pink_btn font32">Done</Button></div> :
                            <div className="text-center my-4"><Button onClick={()=>setShowResult(false)} className="btn pink_btn font32">Next Quiz</Button></div>}
                        </>
                        }
                        
                </div>
                
            </div>
        </div>
    )
}
export default Result;