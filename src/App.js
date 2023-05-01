import React,{useEffect, useState} from "react";
import UserForm from "./components/userform";
import {data} from './data';
import "./app.css";
import Question from "./components/question";
import Result from "./components/result";

function App() {
  const [user, setUser] = useState();
  const [gameData, setgameData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [results, setResults] = useState([]);

  const [lavelIndex, setlavelIndex] = useState(0);
  const [questionIndex, setquestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  useEffect(()=>{
    setgameData(data);
    setCurrentQuestion(data[lavelIndex].questions[questionIndex]);
  },[]);
 
  useEffect(()=>{
    if(questionIndex == data[lavelIndex]?.questions.length){
      setShowResult(true);
      setlavelIndex(lavelIndex + 1);
      setquestionIndex(0);
      // setCurrentQuestion(data[lavelIndex + 1].questions[0]);
    }else if(lavelIndex < data.length){
      setCurrentQuestion(data[lavelIndex].questions[questionIndex]);
    }else{
      setCompleted(true);
      console.log('completed');
    }
    
  },[questionIndex, lavelIndex]);

  useEffect(()=>{
   console.log(results);
  },[results]);

  return (
    <div className="App">

      {!user ? 
      <UserForm setUser={setUser}/> :
      <>
      {showResult ?
        <Result results={results} setShowResult={setShowResult} completed={completed} />
       : 
        <Question 
        data={currentQuestion} 
        setResults={setResults} 
        results={results}
        questionIndex={questionIndex}
        setquestionIndex={setquestionIndex}
        lavel={data[lavelIndex].lavel}
        />
      }
      </>
      }

    </div>
  );
}

export default App;
