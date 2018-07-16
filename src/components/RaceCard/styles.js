export const raceCardStyles = {
    cardContainer: {
        width: '515px',
        height: '580px',
        display: 'relative',
    },
    cartContainerTop: {
        height: '40px',
        width: '100%',
        fontSize: '12px'
    },
    raceInfoContainer: {
        height: '250px',
        width: '100%',
        borderTop: '1px solid #000'
    },
    raceNameP: {
        lineHeight: '20px',
        fontSize: '24px',
        fontWeight: '600',
        marginTop: '30px'
    },
    winnerPrizeP: {
        lineHeight: '20px',
        fontSize: '16px',
        marginTop: '60px'
    },
    remainTimeP: {
        lineHeight: '20px',
        fontSize: '16px',
        marginTop: '30px'
    },
    horseNameP: {
        fontSize: '16px',
        lineHeight: '20px',
        position: 'absolute',
        bottom: 0
    },
    currentState: {
        width: '150px',
        height: '30px',
        backgroundSize: '150px 30px',
        marginTop: '30px',
        fontSize: '16px',
        color: 'white',
        lineHeight: '30px',
        backgroundRepeat: 'no-repeat',
        outline: 'none',
        border: 'none',
        textAlign: 'left',
        paddingLeft: '21px',
        backgroundColor: 'transparent'
    },
    nowStateLoading: {
        width: '100%',
        height: '30px',
        marginTop: '30px',
        fontSize: '16px',
        color: 'white',
        textAlign: 'left',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    horseImgContainer: {
        height: '260px',
        width: '100%',
        display: 'flex',
        flexPack: 'justify',
        justifyContent: 'space-between'
    },
    horseContainer: {
        height: '230px',
        width: '230px',
        position: 'relative'
    },
    horseBack: {
        width: '230px',
        height: '230px',
        position: 'relative',
        backgroundSize: '230px 230px'
    },
    modal: {
        content: {
            top : '50%',
            left  : '50%',
            right : 'auto',
            bottom : 'auto',
            marginRight : '-50%',
            transform : 'translate(-50%, -50%)',
            height: '250px',
            width: '450px',
            position: 'absolute',
            padding: 0,
            zIndex: 8888
        }
    },
    modalTitle: {
        height: '80px',
        width: '100%',
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '16px',
        backgroundColor: 'black',
        color: 'white',
    },
    modalContentField: {
        height: '30px',
        width: '100%',
        lineHeight: '30px',
        marginTop: '14px',
        textAlign: 'left'
    },
};
