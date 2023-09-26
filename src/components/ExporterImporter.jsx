import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://wklqkcdefwiwfxiogqfy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbHFrY2RlZndpd2Z4aW9ncWZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTY0NDM3NiwiZXhwIjoyMDExMjIwMzc2fQ.W-_7Alkq4rX1rXrsMIxgSMTKZxxqZ0pTIARBBg3ynm4");

export default function ExporterImporter({ modelName, directionalLights, loadScene, emptyScene }) {

    const [exportParams, setExportParams] = useState(null)

    const [loading, setLoading] = useState(false)
    const [exporting, setExporting] = useState(false)

    const handleDownloadFile = async () => {
        setExporting(true)
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
        setTimeout(() => {
            setExporting(false)
        }, 2000);
    }

    const handleUploadFile = async (event) => {
        setLoading(true)
        let { data: scenes, error } = await supabase
            .from('scenes')
            .select('*')
            .order('id', { ascending: true })
        setExportParams(scenes)
        setLoading(false)
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            zIndex: '999',
        }}>
            <button onClick={() => handleDownloadFile()}>exportar</button>
            {exporting && <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '10px',
            }}>EXPORTANDO...</div>
            }


            <button onClick={() => handleUploadFile()}>importar</button>
            {loading ? <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '10px',
            }}><img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" width={50} height={50}></img></div> : exportParams && <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '10px',
                }}>
                <span
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: '10px',
                        fontSize: '20px',
                        cursor: 'pointer',
                    }}
                    onClick={() => setExportParams(null)}
                >X</span>
                <span
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        fontSize: '20px',
                        cursor: 'pointer',
                    }}
                    onClick={() => handleUploadFile()}
                ><img src="https://cdn-icons-png.flaticon.com/512/2805/2805355.png" width={20}></img></span>
                <h2>Importar</h2>
                <div
                    style={{
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