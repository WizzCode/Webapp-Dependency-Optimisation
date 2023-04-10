import React, { useState } from 'react';
import {Button} from 'react-bootstrap';

function OptimiserInfo() {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant='secondary' style={{color: 'white', marginLeft: '90%',marginTop: '3%'}} onClick={handleButtonClick}>Info</Button>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              maxWidth: '80%',
              maxHeight: '80%',
              overflow: 'auto',
              
            }}
          >
            <h3 style={{color:'black'}}>Justifications</h3>
            <p></p>
            <p style={{color:'black'}}>1. Avoid string concatenation in loop:  Since strings are immutable, this creates unnecessary temporary objects and results in quadratic rather than linear running time. To improve performance, instead of using string concatenation, create string using StringBuffer outside of the loop and use StringBuffer.append().</p>
            <p style={{color:'black'}}>2. Avoid method calls inside loops: The overhead is significant since the call of method comes with a cost and depending on the complexity and performance of the called method the impact on performance can be huge. For example, the method can be called several hundred to several thousand times </p>
            <p style={{color:'black'}}>3. Avoid if statements with no body: 
            leads to an increase in runtime which is not really required , as nothing gets 
            executed in the ‘then’ clause of the body
            </p>
            <p style={{color:'black'}}>4. Avoid using '==' operator while comparing boolean variable: It is advisable to stop using "==" operator while comparing boolean expressions since java implicitly checks the truth value of boolean variables/expression by their name and hence rendering == in boolean expression comparison makes it redundant and consumes more time as the compiler has to read more code. </p>
            <p style={{color:'black'}}>5. Avoid initializing primitive variables in constructorr:  Java primitive types are created implicitly by the java compiler. And hence need not be created explicitly by the user by calling the constructor. Moreover Sometimes, using primitive types inside constructor can also lead to unpredictable error during comparison. For example, 42==42 would be true if both were primitive types but 42==new Number (42) can Return false </p>
            <p style={{color:'black'}}>6. Avoid using synchronized statements inside loops: using synchronized statements inside the blocks leads to more performance overhead since the thread states have to be checked or changed at each iteration of the loop. Hence it is advisable to use synchronized statements outside loops. </p>
            <p style={{color:'black'}}>7. Avoid using string tokenizer method: The StringTokenizer is legacy, Prefer split() as more chances of its performance getting improved as happens in Java 7. 2 The StringTokenizer doesn't support regular expression, while spilt() does.
            </p>
            <p style={{color:'black'}}>8. Avoid initializing string with new Keyword.: Using a new keyword during the initialization of a string creates a new string on top of the heap. Usually , if a string with the same value is present in the heap already, java compiler just assigns the already created string to a new variable, if the string exists and if new keyword is not used. Using new() keyword consumes extra space on the heap and is also redundant if the string already exists
 </p>
            <p style={{color:'black'}}>9. Avoid using charAt method with strings: Use char[] representation of string instead since charAt does what you're doing (accessing a char[] entry), but also has to have the overhead of a method call and the range check which slows down performance</p>
            <p style={{color:'black'}}>10. Avoid multiple cascading if-else statements:  Using switch statements instead of many cascading if-else statements saves up a lot of runtime as the condition that needs to be executed can be checked immediately as opposed to checking every if-else condition in a cascading if. This is possible as switch strategy is implemented on only a single variable as opposed to many variables together in Java.
</p>

            <Button style={{marginLeft:'70%'}} variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OptimiserInfo;