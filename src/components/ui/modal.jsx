import React from "react";

const Modal = ({ isModalOpen, onClose, children }) => {
 if (isModalOpen !== true) {
   return null;
 }
 return (
   <section className="modal">
     <article className="modal-content p-lg-4">
       <div className="exit-icon text-end">
         <span onClick={onClose} style={{padding: '10px'}}>X</span>
       </div>
       <main className="modal-mainContents">
          {children }
       </main>
     </article>
   </section>
 );
};

export default Modal;