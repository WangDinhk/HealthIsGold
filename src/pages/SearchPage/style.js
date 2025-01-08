import styled from "styled-components";

export const WrapperSearchPage = styled.div`
    padding: 20px;
    max-width: 1270px;
    margin: 0 auto;
    min-height: calc(100vh - 100px);
`

export const WrapperSearchHeader = styled.div`
    margin: 20px 0;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    h2 {
        color: #2F2F2F;
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;

        .keyword-highlight {
            color: #2167DD;
            background: rgba(33, 103, 221, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
        }

        .result-count {
            font-size: 16px;
            color: #666;
            font-weight: normal;
            margin-left: auto;
        }
    }
`

export const WrapperSearchResults = styled.div`
    margin-top: 20px;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .homepage-style {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 20px;
        padding: 10px;

        @media (min-width: 1200px) {
            grid-template-columns: repeat(5, 1fr);
        }

        .card-item {
            transition: transform 0.2s ease;
            
            &:hover {
                transform: translateY(-5px);
            }
        }
    }

    .ant-card {
        border-radius: 8px;
        overflow: hidden;
        height: 100%;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        
        &:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    }
`

export const LoadingWrapper = styled.div`
    text-align: center;
    padding: 60px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .ant-spin {
        .ant-spin-dot-item {
            background-color: #2167DD;
        }
    }
`

export const ErrorMessage = styled.div`
    text-align: center;
    margin-top: 20px;
    padding: 30px;
    background: #FFF2F0;
    border-radius: 12px;
    border: 1px solid #FFE0DB;
    color: #CF1322;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const EmptyResult = styled.div`
    text-align: center;
    padding: 40px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    .empty-icon {
        font-size: 48px;
        color: #999;
        margin-bottom: 16px;
    }

    .empty-text {
        color: #666;
        font-size: 16px;
        margin-bottom: 16px;
    }

    .keyword {
        color: #2167DD;
        font-weight: 600;
        background: rgba(33, 103, 221, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
    }
`

export const PaginationWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: center;
    
    .ant-pagination {
        .ant-pagination-item-active {
            border-color: #2167DD;
            a {
                color: #2167DD;
            }
        }
        
        .ant-pagination-item:hover {
            border-color: #2167DD;
            a {
                color: #2167DD;
            }
        }
        
        .ant-pagination-next:hover .ant-pagination-item-link,
        .ant-pagination-prev:hover .ant-pagination-item-link {
            border-color: #2167DD;
            color: #2167DD;
        }
    }
`;
