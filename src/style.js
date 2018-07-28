export const appStyles = {
    container: function(page){
        if(page !== '/'){
            return {
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(0deg, rgb(255,255,255), rgba(153,240,255,0.6) 30%, rgba(195,172,255,0.6))'
            }
        } else {
            return {
                position: 'absolute',
                width: '100%',
                height: '100%',
            }
        }
    },
    gifContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '600px',
        minWidth: '1080px'
    },
    backGif: {
        width: '100%',
        height: "auto",
        position: 'absolute',
        top: '0',
        zIndex: '-1',
        opacity: '0.7'
    },
    loadGif: {
        width: '420px',
        height: '250px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
};
