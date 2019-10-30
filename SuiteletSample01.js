/**
* @NApiVersion 2.x
* @NScriptType Suitelet
* @NModuleScope Public
*/
define(['N/ui/serverWidget', 'N/search', 'N/runtime', 'N/log'],
function(_serverWidget, _search, _runtime, _log) {
    
    function onRequest(context){
        try {
            if(context.request.method === 'GET')
                return createProjectProcessPage_AsGet(context)
            else if(context.request.message === 'POST')
                return createProjectProcessPage_AsPost(context)
            else
                throw "_NO_CONTEXT_"                

        }catch(ex){

            _log.error("Error on Execution",JSON.stringify(ex));

            const form = _serverWidget.createForm({
                title: 'We receive a error during execution', 
                hideNavBar : false
            })

            form.addFieldGroup({
                id : 'paramgroup',
                label : 'We cannot run your request'
            })

            form.addField({
                id: "custpage_errormessage",
                type: _serverWidget.FieldType.LABEL,
                label: ''.concat('An error as found  :', ex.name, 'Status'),
                container: 'paramgroup'
            })

            context.response.writePage(form)
        }
    }

    function createProjectProcessPage_AsGet(context) {
        const form = _serverWidget.createForm({ 
            title: 'My simple form',
            hideNavBar : false
        })

        form.addFieldGroup({
            id: 'group',
            label: 'Simple header from NetSuite Form'
        })

        form.addField({
            id: "custpage_simplefield",
            type: _serverWidget.FieldType.TEXT,
            label: "Simple field",
            container: 'group',
        })

        form.addSubmitButton(" Send ")
        context.response.writePage(form)
    }

    function createProjectProcessPage_AsPost(context){
        //CREATE YOUR POST REQUEST 
    }

    return {
        onRequest: onRequest
    }
})
