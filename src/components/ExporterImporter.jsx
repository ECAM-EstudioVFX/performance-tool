import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://wklqkcdefwiwfxiogqfy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbHFrY2RlZndpd2Z4aW9ncWZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTY0NDM3NiwiZXhwIjoyMDExMjIwMzc2fQ.W-_7Alkq4rX1rXrsMIxgSMTKZxxqZ0pTIARBBg3ynm4");

export default function ExporterImporter({ modelName, directionalLights, loadScene, emptyScene }) {

    const [exportParams, setExportParams] = useState(null)

    const handleDownloadFile = async () => {
        const exportParams = {
            modelName: modelName,
            directionalLights: directionalLights
        }

        const { data, error } = await supabase
            .from('scenes')
            .insert([
                { params: exportParams, date: new Date(), time: new Date().toLocaleTimeString() },
            ])
            .select()
    }

    const handleUploadFile = async (event) => {
        let { data: scenes, error } = await supabase
            .from('scenes')
            .select('*')
            .order('id', { ascending: true })
        setExportParams(scenes)
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            zIndex: '999',
        }}>
            <button onClick={() => handleDownloadFile()}>exportar</button>
            <button onClick={() => handleUploadFile()}>importar</button>
            {exportParams && <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '10px',
            }}>
                <span style={{
                    position: 'absolute',
                    top: 0,
                    right: '10px',
                    fontSize: '20px',
                    cursor: 'pointer',
                }}
                onClick={() => setExportParams(null)}
                >X</span>
                <h2>Importar</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    height: '30px',
                    padding: '0 10px',
                }}>
                    <div>id</div>
                    <div>nombre</div>
                    <div>fecha</div>
                </div>
                {exportParams.map((scene, index) => (
                    <div
                        key={index}
                        className="hover:bg-gray-200"
                        style={{
                            width: '300px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '30px',
                            padding: '0 10px',
                            cursor: 'pointer',
                        }}
                        hover={{ backgroundColor: 'red' }}
                        onClick={() => {
                            emptyScene()
                            loadScene(scene)
                            setExportParams(null)
                        }}
                    >
                        <div>{scene.id}</div>
                        <div>{scene.params.modelName}</div>
                        <div>{scene.date} - {scene.time}</div>
                    </div>
                ))}
            </div>}
        </div>
    )
}