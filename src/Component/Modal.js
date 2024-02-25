import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSave, initialContent, initialGrade }) => {
  const [content, setContent] = useState(initialContent);
  const [grade, setGrade] = useState(initialGrade);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  };

  const handleClose = () => {
    onClose(); // 모달 닫기
  };

  const handleSave = () => {
    onSave(content, grade);
    onClose(); // 저장 후 모달 닫기
  };

  return (
    isOpen && (
      <div>
        <div className="modal bg-white" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modify Review</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <label htmlFor="content">Content:</label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                  />
                </div>
                <div>
                  <label htmlFor="grade">Grade:</label>
                  <input
                    type="number"
                    id="grade"
                    value={grade}
                    onChange={handleGradeChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={handleClose}>
                  Close
                </button>
                <button type="button" onClick={handleSave}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
