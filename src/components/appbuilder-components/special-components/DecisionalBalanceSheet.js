import React from 'react';

const DecisionalBalanceSheet = ({ component, index }) => (
    <>
     <h2>Decisional Balance Sheet</h2>
    <div className="labelsRow">
      <div className="blankLabel"></div>
      <label className="benefitsLabel">Benefits</label>
      <label className="consLabel">Cons</label>
    </div>
    <div className="decisionalBalanceSheet">
    <div className="labelsColumn">
    <label id ="changing" >Not Changing</label>
    <label>Changing </label>


    </div>
      <textarea
        className="contentInput"
        placeholder="Benefits of Making a Change"
        value={component.content.makingChangeBenefits}
        
      ></textarea>
      <textarea
        className="contentInput"
        placeholder="Cons of Making a Change"
      
        value={component.content.makingChangeCons}
      
      ></textarea>
    
    <textarea
      className="contentInput"
      placeholder="Benefits of Not Changing"
      value={component.content.notChangingBenefits}
   
    ></textarea>
    <textarea
      className="contentInput"
      placeholder="Cons of Not Changing"
      value={component.content.notChangingCons}
    ></textarea>



  </div>


  </>

);

export default DecisionalBalanceSheet;
