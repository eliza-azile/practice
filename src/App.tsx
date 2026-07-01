import Button from './components/Button/Button';

function App() {
    return (
        <div style={{ padding: '40px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">ПОМОЧЬ</Button>
            <Button variant="primary" size="small">Small</Button>
            <Button variant="primary" size="large">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
        </div>
    );
}

export default App;