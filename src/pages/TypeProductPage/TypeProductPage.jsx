import { Col, Row, Pagination } from 'antd';
import {React, Fragment} from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponentLeft from '../../components/NavBarComponentLeft/NavBarComponentLeft';
import { WrapperNavBar, WrapperProducts } from './style';

const TypeProductPage = () => {
    const onChange = () => {}
    return (
        <div style={{backgroundColor :'#edf0f3', padding :'20px 120px'}}>
            
            <Fragment >
                <Row style={{flexWrap : 'nowrap', padding:'20px 0'}}>
                    <WrapperNavBar span={6}>
                        <NavBarComponentLeft />
                    </WrapperNavBar>
                    <WrapperProducts span={18}>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
                </Row>
                <Pagination align="center" defaultCurrent={1} total={50} />
            </Fragment>
                
        </div>

    );
}

export default TypeProductPage;