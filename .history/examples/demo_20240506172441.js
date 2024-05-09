import React from 'react';
import ReactDOM from 'react-dom';
import VisibleObserver from './VisibleObserver';

const App = () => {
    const handleVisible = () => {
        console.log('Element is visible!');
    };

    return (
        <div style={{ height: '1500px' }}>
            <VisibleObserver onVisible={handleVisible}>
                <div style={{ marginTop: '1000px', height: '200px', background: 'red' }}>
                    如果你滚动到这里，控制台将显示消息。
                </div>
            </VisibleObserver>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
