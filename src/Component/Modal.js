import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSave, initialContent, initialGrade }) => {

  const [content, setContent] = useState(initialContent)
  const [grade, setGrade] = useState(initialGrade)

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleGradeChange = (e) => {
    setGrade(e.target.value)
  }

  const handleSave = () => {
    onSave(content, grade)
    onclose() // 저장 후 모달 닫기
  }

  return (
    isOpen && (
        <div>

        <div class="modal bg-white" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modify Review</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label htmlFor="content">Content:</label>
                            <textarea id="content" value={content} onChange={handleContentChange} />
                        </div>
                        <div>
                            <label htmlFor="grade">Grade:</label>
                            <input type="text" id="grade" value={grade} onChange={handleGradeChange} />
                        </div>
                    </div>
                        <div class="modal-footer">
                            <button type="button" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSave}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        {/* <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="modal-body">
                    <form onSubmit={handleSave}>
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea id="content" value={content} onChange={handleContentChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="grade">Grade:</label>
                            <input type="text" id="grade" value={grade} onChange={handleGradeChange} />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </div> */}
        </div>
    )
  );
};

export default Modal;