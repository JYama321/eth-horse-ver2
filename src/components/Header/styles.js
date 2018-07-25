export const headerStyles = {
    container: {
        position: 'absolute',
        width: '100%',
        height: '256px',
    },
    headerTopContainer: {
        width: '100%',
        height: '96px',
        borderBottom: '1px solid #000'
    },
    headerMenuContainer: {
        width: '1080px',
        height: '96px',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
    },
    headerBottomContainer: (path) =>  ({
        width: '1080px',
        height: '160px',
        position: 'relative',
        margin: '0 auto',
        borderBottom: (path === 'events' || path === 'ranking') ? 'none' : '2px solid #000'
    }),
    headerBottomContents: {
        position: 'absolute',
        width: '100%',
        height: '50px',
        display: 'flex',
        bottom: 0
    },
    headerBottomLeft: {
        height: '100%',
        width: '50%'
    },
    headerBottomRight: {
        height: '100%',
        width: '50%',
        position: 'relative'
    },
    headerRightBalance: {
        width: '150px',
        height: '25px',
        lineHeight: '25px',
        color: 'white',
        position: 'absolute',
        backgroundColor: 'black',
        right: 0,
        top: 0,
        textAlign: 'center'
    },
    headerTitle: {
        fontFamily: 'GoudyOldstyle-Regular',
        width: '57.5%',
        height: '100%',
        textAlign: 'left'
    },
    headerTitleH1: {
        fontSize: '38px',
        fontWight: '100'
    },
    headerRightMenu: {
        width: '42.5%',
        height: '100%',
        display: 'flex',
        borderLeft: '1px solid #000'
    },
    headerLeftMarket: {
        width: '100%',
        height: '25px',
        display: 'flex',
    },
    headerLeftButtonMarket: function(isDisplayed) {
        if(isDisplayed){
            return {
                lineHeight: '20px',
                fontSize: '14px',
                width: 'fit-content',
                marginRight: '56px',
                textAlign: 'left',
                outline: 'none',
                border: 'none',
                textDecoration: 'underline',
                backgroundColor: 'transparent'
            }
        } else {
            return {
                lineHeight: '20px',
                fontSize: '14px',
                width: 'fit-content',
                marginRight: '56px',
                textAlign: 'left',
                outline: 'none',
                border: 'none',
                backgroundColor: 'transparent'
            }
        }
    }
};
