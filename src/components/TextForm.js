import React, { useState } from 'react'

export default function TextForm(props) {
    const [text, setText] = useState("");

    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    const handleUpClick = () => {
        setText(text.toUpperCase());
        if (text.length > 0) {
            props.showAlert("Text is converted to uppercase", "success");
        }
    }
    const handleLoClick = () => {
        setText(text.toLowerCase());
        if (text.length > 0) {
            props.showAlert("Text is converted to lowercase", "success");
        }
    }
    const textToSpeech = () => {
        const msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
        if (text.length > 0) {
            props.showAlert("The reading has been started", "success");
        }
    }
    const centerStart = () => {
        const textArea = document.getElementById('text-area');
        if (textArea.style.textAlign === 'left') {
            textArea.style.textAlign = 'center';
        } else {
            textArea.style.textAlign = 'left';
        }
    }
    const textCopy = () => {
        const text = document.getElementById('text-area');
        text.select();
        navigator.clipboard.writeText(text.value);
        setTimeout(() => document.getSelection().removeAllRanges(), 700);
        if (text.value.length > 0) {
            props.showAlert("Text has been copied", "success");
        }
    }
    const removeExtraSpaces = () => {
        const newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        if (text.length > 0) {
            props.showAlert("Extra spaces are removed", "success");
        }
    }
    // const wordCount = () => {
    //     let counter = 0;
    //     for (let i = 0; i < text.length; i++) {
    //         if (text[i] === " " && text[i + 1] !== " ") {
    //             counter++;
    //         }
    //     }
    //     return counter;
    // }

    return (
        <>
            <div className="container">
                <div className="mb-3 mt-4">
                    <label htmlFor="text-area" className="form-label text-primary"><h1>{props.heading}</h1></label>
                    <textarea className="form-control" value={text} onChange={handleOnChange} id="text-area" rows="8"></textarea>
                </div>
                <button className="btn btn-primary btn-sm" onClick={handleUpClick}>Convert to uppercase</button>
                <button className="btn btn-primary btn-sm mx-2 my-1" onClick={handleLoClick}>Convert to lowercase</button>
                <button className="btn btn-primary btn-sm" onClick={textToSpeech}>Speak</button>
                <button className="btn btn-success btn-sm mx-2 my-1" onClick={centerStart}>Center/Start</button>
                <button className="btn btn-success btn-sm" onClick={textCopy}>Copy Text</button>
                <button className="btn btn-success btn-sm mx-2 my-1" onClick={removeExtraSpaces}>Remove extra spaces</button>
            </div>
            <div className="container mt-3" id='summary'>
                <h3 className='text-success'>Your text summary</h3>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words, {text.length} character</p>
                <p>Time to read the paragraph {0.008 * ((text.split(/\s+/).filter((element) => { return element.length !== 0 }).length))} minutes</p>
            </div>
        </>
    )
}





