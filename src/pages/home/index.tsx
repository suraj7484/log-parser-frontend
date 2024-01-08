import React from "react";
import "../../assets/styles/pages/home.scss";
import Input from "../../components/input";
import TextField from "../../components/textField";
import Button from "../../components/button";
import { parseLogFileApi } from "../../api";
import commonToasts from "../../common/commonToasts";
import Loader from "../../components/loader";

const Index = () => {
    const [ loading, setLoading ] = React.useState<boolean>( false );
    const [ logEvents, setLogEvents ] = React.useState<any>( {} );
    const [logs, setLogs] = React.useState([])

    const [file, setFile] = React.useState<any>(null);
    const [filename, setFilename] = React.useState<any>(null);
  
    const handleFileChange = (event: any) => {
        setFile( event?.target?.files[ 0 ] );
        setFilename(event?.target?.files[ 0 ]?.name)
    };
    
    const handleLogParserSubmit = async (data:any) => {
        try {
            setLoading( true )
            const formData = new FormData();
            formData.append('file', file);
            const callResponse = await parseLogFileApi( formData );
            const callData = callResponse.data?.responseData
            if ( callData ) {
                let obj:any = {}
                callData?.forEach( ( c:any ) => {
                    if ( obj[ c?.loglevel ] ) {
                        obj[ c?.loglevel ] += 1
                    } else {
                        obj[ c?.loglevel ] = 1
                    }
                })
                setLogEvents( obj );
                setLogs( callData )
                
                const blob = new Blob([JSON.stringify(callData)], { type: 'application/json' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'parsedLogs.json';
                link.click();
            } else {
                setLogs([])
                commonToasts.errorToast("Sometihng Went Wrong")
            }
            setLoading(false)
        } catch ( err ) {
            setLoading(false)
            commonToasts.errorToast("Sometihng Went Wrong")
        }
    }
    
    return <React.Fragment>
        <div className="page-container">
            <div className="main-container">
                <form className="form-container" autoComplete="off" >
                    <TextField as="h2" className="color-secondary" >
                        Log parser
                    </TextField>
                    <Input name={ "attachment" } filename={filename} type={ "file" } placeholder={ "Select File..." } className="custom-file-input" onChange={handleFileChange} />
                    <Button type="button" label={ "Submit" } variant={ "secondary" } onClick={ handleLogParserSubmit } disabled={ !Boolean(file)} />
                </form>
                <div className="value-container">
                    { loading ? <Loader /> :
                        <React.Fragment>
                            <div className="display-flex">
                                { Object.entries( logEvents ).map( (log:any) => {
                                    return  <TextField as="h5" className="color-secondary" >
                                        {`${log[0]}: ${log[1]}` }
                                    </TextField> 
                                    
                                } ) }
                            </div>
                            <hr />
                            <div className="value-container-content">
                                { logs?.map( ( l:any , idx:number) => {
                                    return <TextField as="p" className={ `${l?.loglevel === "warn" ? "color-warn" : "color-danger"} text-align-left` } >
                                            {`${idx + 1}. ${l.err}` }
                                        </TextField> 
                                })}
                            </div>
                        </React.Fragment> }
                    
                    {}
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Index;