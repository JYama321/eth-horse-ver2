export const bookMakeModalStyle = {
    modalContent: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        padding: 0,
        zIndex: 8888
    },
    horseCardContainer: {
        width: '225px',
        height:  '300px',
        position: 'relative'
    },
    applyRaceButton: {
        width: '100%',
        height: '25px',
        backgroundSize: '150px 25px',
        outline: 'none',
        border: 'none',
    },
    inputField: {
        width: '150px',
        height: '25px',
    },
    decideBetButton: {
        width: '60%',
        height: '30px',
        maxWidth: '400px',
        backgroundColor: 'black',
        color: 'white',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '3%'
    },
    modalTopTitle:{
        width: '100%',
        height: '80px',
        color: 'white',
        backgroundColor: 'black',
        lineHeight: '80px',
        textAlign: 'center'
    },
    horseListContainer: {
        width: '80%',
        height: '400px',
        position: 'absolute',
        margin: 'auto',
        left: '50%',
        top: 'calc(50% + 80px)',
        transform: 'translate(-50%,-50%)',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '550px'
    },
};
