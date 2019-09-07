import React from 'react'


class ActionModal extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            hidden:true
        }
    }

    toggle=()=>{
        this.setState({
            hidden:!this.state.hidden
        })
    }

    render()
    {
        if(this.state.hidden)
            return <div></div>

        const buttons=[]
        if(this.props.okCBK)
            buttons.push(
                <button className="btn btn--ok" key={0}
                onClick={()=>{this.props.okCBK();this.toggle();}}>
                    {this.props.okText}
                </button>
            )
        if(this.props.cancelCBK)
            buttons.push(
                <button className="btn btn--cancel" key={1} 
                onClick={()=>{this.props.cancelCBK();this.toggle();}}>
                    {this.props.cancelText}
                </button>
            )

        return(
            <div className="modal">
                    <div className="modal__content">
                        <div className="modal__header" style={{backgroundColor:this.props.modalHeaderBg,color:this.props.modalHeaderColor}}>
                            <button className="modal__header__close" onClick={this.toggle}>&times;</button>
                            <h4 className="modal__header__title">{this.props.modalHeaderTitle}</h4>
                        </div>
                        <div className="modal__body">
                            <p>{this.props.modalBody}</p>
                        </div>
                        <div className="modal__footer">
                            {buttons}
                        </div>
                    </div>
            </div>
        )
    }
}

export default ActionModal