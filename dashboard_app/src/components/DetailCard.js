import React, { useEffect, useState } from 'react';
import { Card, Badge, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faShareAlt, faBullseye, faMapMarkerAlt, faChartDiagram, faUser, faComment, faHeart, faUsers } from '@fortawesome/free-solid-svg-icons';

function DetailCard(props) {
    const [data, setData] = useState(props.data);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Card>
                <small>
                    <Badge onClick={handleOpenModal} pill style={{ cursor: 'pointer' }}>View More</Badge>
                </small>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{data.name}</Card.Subtitle>
                    <div align='left'>
                        <Card.Text>
                            <span className='text-muted'><FontAwesomeIcon icon={faChartLine} style={{ color: '#86AB89' }} /> Engagement score: </span>{data.engagementScore}
                        </Card.Text>
                        <Card.Text>
                            <span className='text-muted'><FontAwesomeIcon icon={faShareAlt} style={{ color: '#F0C1E1' }} /> Shares: </span>{data.shares}
                        </Card.Text>
                        <Card.Text>
                            <span className='text-muted'><FontAwesomeIcon icon={faBullseye} style={{ color: '#FFB38E' }} /> Reach: </span>{data.reach}
                        </Card.Text>
                        <Card.Text>
                            <span className='text-muted'><FontAwesomeIcon icon={faChartDiagram} style={{ color: '#D0B8A8' }} /> Category: </span>{data.category}
                        </Card.Text>
                        <Card.Text>
                            <span className='text-muted'><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#CDC1FF' }} /> Location: </span>{data.location}
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header align='center'>
                    <Modal.Title>{data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon size='2x' icon={faHeart} style={{ color: '#FF8A8A' }} />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.likes}</span>
                            <p><strong>Likes</strong></p>
                        </div>
                    </div>
                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon size='2x' icon={faShareAlt} style={{ color: '#F0C1E1' }} />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.shares}</span>
                            <p><strong>Shares</strong></p>
                        </div>
                    </div>
                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon size='2x' icon={faBullseye} style={{ color: '#FFB38E' }} />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.reach}</span>
                            <p><strong>Reach</strong></p>
                        </div>
                    </div>

                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon size='2x' icon={faComment} style={{ color: '#7EACB5' }} />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.comments}</span>
                            <p><strong>Comments</strong></p>
                        </div>
                    </div>
                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon icon={faUsers} style={{ color: '#B4F2E1' }} size='2x' />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.followers}</span>
                            <p><strong>Followers</strong></p>
                        </div>
                    </div>
                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon size='2x' icon={faChartDiagram} style={{ color: '#D0B8A8' }} />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.category}</span>
                            <p><strong>Category</strong></p>
                        </div>
                    </div>
                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon size='2x' icon={faMapMarkerAlt} style={{ color: '#CDC1FF' }} />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.location}</span>
                            <p><strong>Location</strong></p>
                        </div>
                    </div>
                    <div className='modal-item'>
                        <div className="icon">
                            <FontAwesomeIcon size='2x' icon={faChartLine} style={{ color: '#86AB89' }} />
                        </div>
                        {' '}
                        <div className='details' align='center'>
                            <span>{data.engagementScore}</span>
                            <p><strong>Engagement Score</strong></p>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button onClick={() => handleCloseModal()}>Close</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailCard;
