export const CenteredHeader = (name) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
            }}>
            {name}
        </div>
    );
};
