export const styles = {
    modalContainer: {
        content: {
            width: '320px',
            height: '530px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            padding: 0
        }
    },
    modalHeader: {
        width: 'calc(100% - 56px)',
        height: '140px',
        padding: '0 28px',
        position: 'absolute',
        top: 0,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'left'
    },
    headerTitle: {
        marginTop: '21px',
        fontSize: '18px'
    },
    headerText: {
        marginTop: '21px',
        fontSize: '14px'
    },
    modalBottomContent: {
        width: '100%',
        position: 'absolute',
        top: '140px',
        height: '390px'
    },
    browserCard: {
        width: '260px',
        height: '60px',
        margin: '21px auto 0',
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex'
    },
    browserText: {
        width: '180px',
        height: '60px',
        textAlign: 'left',
        paddingLeft: '10px',
        lineHeight: '60px'
    },
    browserIconContainer: {
        display: 'inline-block',
        width: '80px',
        height: '60px',
        textAlign: 'center',
    }
};