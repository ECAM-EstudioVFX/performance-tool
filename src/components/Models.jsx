import { Suspense } from "react"    
import { Center, Html } from "@react-three/drei"
import Model from "./Model"

function Models({ modelURL, setModelURL }){
    return (
        <Suspense fallback={<Html>Loading...</Html>}>    
        {modelURL && (
            <Center>
              {modelURL.length > 0 && modelURL.map((model, index) =>
                model.active && (
                  <Model
                    key={index}
                    id={index}
                    url={model.url}
                    name={model.name}
                    setModelURL={setModelURL}
                  />
                )
              )}
            </Center>
        )}
      </Suspense>
    )
}

export default Models