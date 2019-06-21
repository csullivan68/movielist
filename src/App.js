import React,{Component} from 'react';
import './App.scss';

const newQuiz = [{
  name: "Food Quiz",
  author: "Colleen",
  questions: [
    {
      questionName: "What fruit do you like best?",
      answer: [
        {
          text: "Bananas"
        },
        {
          text: "Apples"
        },
        {
          text: "Oranges"
        }
      ]
    },
    {
      questionName: "Best vacation spot?",
      answer: [
        {
          text: "Mountains"
        },
        {
          text: "Beach"
        },
        {
          text: "City"
        }
      ]
    },
    {
      questionName: "Favorite farm animal?",
      answer: [
        {
          text: "Cow"
        },
        {
          text: "Sheep"
        },
        {
          text: "Pig"
        },
        {
          text: "Goat"
        },
        {
          text: "Chicken"
        }
      ]
    }
  ]
}]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      quizzes: newQuiz,

    }
  }


  componentDidMount(){
    fetch('http://localhost:8080/get-all-quizzes')
  .then(response => {
    return response.json();
  })
  .then(myJson => {
   this.setState({
      quizzes: myJson
    }, () => //will wait until previous is executed
    console.log(this.state.quizzes) //implicit return: implied only return
    )
  });
  }
 handleAddQuiz = (e) => {
   e.preventDefault(); //prevent from calling as soon as rendered
   console.log(e);
   fetch('http://localhost:8080/add-quiz',{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(newQuiz),
  })
  .then(res => {
    if(res.status === 200){
      console.log("quiz added")
    }
    else{
      console.log("something died")
    }

  })
  .catch(err =>{
    console.log(err)
  })
 
 }
 
  render(){
    console.log(this.state)
    return (
     <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">Open Quiz</span>
        <i onClick={e => this.handleAddQuiz(e)} className = "far fa-plus-square add-icon my-2 my-sm-0"></i>
      </nav>
    <div className= "Container">
     {this.state.quizzes.map((quiz, index) => {
       return( //can only have one parent in return 
         <div class="card" key={index}> 
          <div class="card-body">
          <h5 class="card-title"><p>Quiz Name: {quiz.name}</p>
           <p>Author: {quiz.author}</p></h5>
           {quiz.questions.map((questions, index) => {
             return(
               <div key={index}>
                 <p>Question {index + 1}: {questions.questionName}</p>
                  {questions.answer.map((answer, index) => {
                     return(
                       <div key={index}>
                        <p>{index + 1}: {answer.text}</p>
                       </div>
                      )
                    })
                  }
               </div>
             )
           })}
         </div>
         </div>
       )
     })} 
      <button onClick={e => this.handleAddQuiz(e)}> Add Quiz </button>
     </div>
     </div>
    );
  }
}

export default App;
