import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Helmet } from "react-helmet";
import axios from 'axios'

const CSS_HANDLES = ['calendlyContainer']

const CalendlyIntegration = () => {
  
  const [settings, setSettings] = React.useState({
    divClass: "",
    divDataUrl: "",
    scriptUrl: ""
  })
  const handles = useCssHandles(CSS_HANDLES)

  React.useEffect(() => {
    axios.get(
      '/settingscalendly'
    ).then(res => {
      setSettings({
        divClass: res.data.divClass,
        divDataUrl: res.data.divDataUrl,
        scriptUrl: res.data.scriptUrl
      })
    })
    .catch((e: any) => console.log(e))
  },[])

  return (settings.divClass && settings.divDataUrl && settings.scriptUrl) ? (
    <div 
      className={`${handles.calendlyContainer} ${settings.divClass}`} 
      style={{
        height: "630px"
      }}
      data-url={`${settings.divDataUrl}`}>
        <Helmet>
          <script type="text/javascript" src={`${settings.scriptUrl}`} async={true} defer></script>
        </Helmet>
    </div>
  ) : null
}

export default CalendlyIntegration
