import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Modal as BootstrapModal } from 'bootstrap';

interface ModalProps {
	title: string;
	saveBtnText: string;
	onSave: () => void;
	children: React.ReactNode;
	show: boolean;
	onClose: () => void;
}

const Modal = ({ title = '', saveBtnText = '', children, onSave, show, onClose }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const bsModal = useRef<BootstrapModal | null>(null);

	useEffect(() => {
		if (modalRef.current) {
			bsModal.current = new BootstrapModal(modalRef.current, {
				backdrop: 'static',
				keyboard: false
			});
		}

		return () => {
			if (bsModal.current) {
				bsModal.current.hide();
			}
		};
	}, []);

	useEffect(() => {
		if (bsModal.current) {
			if (show) {
				bsModal.current.show();
			} else {
				bsModal.current.hide();
			}
		}
	}, [show]);

	// Manual handling of closing the modal to ensure React state and Bootstrap modal are in sync
	const handleClose = () => {
		onClose();
		if (bsModal.current) {
			bsModal.current.hide();
		}
	};

	return ReactDOM.createPortal(
		<div
			className="modal fade"
			ref={modalRef}
			id="exampleModal"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button
							type="button"
							className="btn-close"
							onClick={handleClose}
							aria-label="Close"></button>
					</div>
					<div className="modal-body">{children}</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={handleClose}>
							Close
						</button>
						<button type="button" className="btn btn-primary" onClick={onSave}>
							{saveBtnText}
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('modal-root') as HTMLElement
	);
};

export default Modal;
