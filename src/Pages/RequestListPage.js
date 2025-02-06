import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CancelButton from '../components/ListPage/CancelButton';
import DeleteButton from '../components/ListPage/DeleteButton';
import { PageContainer } from '../components/PageContainer';
import ApiService from '../utils/ApiService';

const RequestedDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        ApiService.fetchDocuments('requested')
            .then(response => {
                setDocuments(response.data);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            })
            .catch(error => {
                setError('문서를 불러오는 중 문제가 발생했습니다: ' + error.message);
            });
    }, [itemsPerPage]);

    const getCurrentPageData = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return documents.slice(indexOfFirstItem, indexOfLastItem);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const refreshDocuments = () => {
        ApiService.fetchDocuments('requested')
            .then(response => {
                setDocuments(response.data);
                setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            })
            .catch(error => {
                setError('문서를 불러오는 중 문제가 발생했습니다: ' + error.message);
            });
    };

    const getStatusStyle = (status) => {
        const statusStyles = {
            0: { backgroundColor: '#FFEB3B', color: '#000', border: 'none' },
            1: { backgroundColor: '#2196F3', color: '#fff', border: 'none' },
            2: { backgroundColor: '#F44336', color: '#fff', border: 'none' },
            3: { backgroundColor: '#FF9800', color: '#fff', border: 'none' },
        };
        return statusStyles[status] || { backgroundColor: '#FFFFFF', color: '#000', border: '1px solid #ddd' };
    };

    const getStatusLabel = (status) => {
        const statusLabels = {
            0: '대기 중',
            1: '완료',
            2: '거절됨',
            3: '요청 취소됨',
        };
        return statusLabels[status] || '알 수 없음';
    };

    return (
        <PageContainer>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>요청한 문서 리스트</h1>
            {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>}
            <table style={{ borderCollapse: 'collapse', width: '100%', margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                <tr>
                    <th style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>Status</th>
                    <th style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>File Name</th>
                    <th style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>Created At</th>
                    <th style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>Updated At</th>
                    <th style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {getCurrentPageData().map((doc) => (
                    <tr key={doc.id}>
                        <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                            <span style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', ...getStatusStyle(doc.status) }}>
                                {getStatusLabel(doc.status)}
                            </span>
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                            <Link to={`/detail/${doc.id}`} style={{ textDecoration: 'none', color: '#2196F3' }}>{doc.fileName}</Link>
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{doc.createdAt}</td>
                        <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{doc.updatedAt}</td>
                        <td style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                            {doc.status === 0 ? <CancelButton documentId={doc.id} refreshDocuments={refreshDocuments} /> : <DeleteButton documentId={doc.id} refreshDocuments={refreshDocuments} />}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </PageContainer>
    );
};

export default RequestedDocuments;