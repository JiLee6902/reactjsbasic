import Select from 'react-select';
import { useState } from 'react';
import './Questions.scss';
import { FcPlus } from 'react-icons/fc';
import {TbHeartPlus} from "react-icons/tb";
import {BsPatchMinusFill} from "react-icons/bs";
import {BsFillPatchPlusFill} from "react-icons/bs";
import {AiFillPlusCircle, AiOutlineMinusCircle} from "react-icons/ai";
import {RiImageAddFill} from "react-icons/ri";
import { v4 as uuidv4} from 'uuid';
import _ from 'lodash';
import "react-awesome-lightbox/build/style.css";
import Lightbox from "react-awesome-lightbox";

const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];

    const [selectedQuiz, setSelectedQuiz] = useState({});  
    const [questions, setQuestions] = useState (
        [
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }         
        ]
    )

    const [isPreviewImage, setIsPreviewImage] = useState(false);


    const handleAddRemoveQuestion = (type, id, value) => { 
        if (type==='ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            };
            setQuestions([...questions, newQuestion])
        }

        if (type==='REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }
    const handleAddRemoveAnswer = (type, questionId, anwserId) => {
        console.log(type) 
        let questionsClone = _.cloneDeep(questions);
        if (type==='ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            };

            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone)
        }

        if (type==='REMOVE') {
            let questionsClone =  _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== anwserId);
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone =  _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }                 
        }
    }

    const handleOnChangeFileQuestion = (questionId, event) => {
            let questionsClone =  _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1 && event.target && event.target.files && event.target.files[0]) {
                questionsClone[index].imageFile = event.target.files[0];
                questionsClone[index].imageName = event.target.files[0].name;
                setQuestions(questionsClone);            
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone =  _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers = 
            questionsClone[index].answers.map(answer => {
                if(answer.id === answerId) {
                    if(type ==='CHECKBOX') {
                        answer.isCorrect = value;  
                    }
                    if(type ==='INPUT') {
                        answer.description = value  
                    }
                }
                return answer;
            })
            setQuestions(questionsClone);            
    }
    }

    const handleSubmitQuestionForQuiz = () => {
    console.log('>> questions: ', questions);
    }



    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr/>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>
                </div>
            <Select
              defaultValue={selectedQuiz}
              onChange={selectedQuiz}
              options={options} 
            />
            </div>
            
            <div className='mt-3 mb-2'>
            Add questions:
            </div>

            {
                questions && questions.length > 0 
                && questions.map((question, index) => {
                    return (
                        <div key={question.id} className='q-main mb-4'>
            <div className='questions-content'>
              <div className="form-floating description ">
                <input 
                type="type" 
                className="form-control" 
                placeholder="name@example.com"
                value={question.description}
                onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                />
                <label>Question {index+1} 's description</label>
              </div>
              <div className='group-upload'>
                <label htmlFor={`${question.id}`}>
                    <RiImageAddFill className='label-up'/>
                </label>
                        <input
                        id={`${question.id}`}
                        onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                        type={'file'}
                        hidden
                        />
                        <span>{question.imageName ? 
                             <span style = {{cursor: 'pointer'}}
                             onClick={() => setIsPreviewImage(true)}>{question.imageName}</span> 
                             :
                             'No file is uploaded.'
                        }</span>
              </div>
              <div className='btn-add'>
                <span onClick={() => handleAddRemoveQuestion('ADD','')}>
                    <BsFillPatchPlusFill className='icon-add'/>
                </span>
                {questions.length > 1 &&
                <span onClick={() => handleAddRemoveQuestion('REMOVE',question.id)}>
                    <BsPatchMinusFill className='icon-remove'/>
                </span>
                }
              </div>    
            </div>

            {question.answers && question.answers.length > 0
            && question.answers.map((answer, index) => {
                return (
                <div key={answer.id} className='answers-content'>
                <input
                    className="form-check-input iscorrect"
                    type="checkbox"
                    checked={answer.isCorrect}
                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                />
                <div className="form-floating anwser-name ">
                    <input 
                    type="type" 
                    className="form-control" 
                    value={answer.description}
                    placeholder="name@example.com"
                    onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                    />
                    <label>Answers {index+1}</label>
                </div>
                <div className='btn-group'>
                <span onClick={()=> handleAddRemoveAnswer('ADD',question.id)}>
                    <AiFillPlusCircle className='icon-add'/>
                </span>
                {question.answers.length > 1 &&
                <span onClick={()=> handleAddRemoveAnswer('REMOVE',question.id,answer.id)}>
                    <AiOutlineMinusCircle className='icon-remove'/>
                </span>
                }
              </div>
            </div>
                )
            })
            }

                {isPreviewImage === true 
                && <Lightbox 
                image= {URL.createObjectURL(question.imageFile)}
                title={question.imageName}
                onClose = {() => setIsPreviewImage(false)}
                ></Lightbox>
                }
            </div>
                    )
                })
            }
            {
                questions && questions.length > 0
                && <div>
                    <button
                    onClick={() => handleSubmitQuestionForQuiz()} 
                    className='btn btn-warning'>Save Questions</button>
                </div>
            }

            
        </div>
    )
}

export default Questions;
