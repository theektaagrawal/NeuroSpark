import { Canvas } from '@react-three/fiber'
import Cafe from '../components/Metaverses/Cafe'

function Metaverse() {
  return (
    <div className="h-screen">
        <Canvas
        camera={{ fov: 25, aspect: 1 }}
        shadows
        >
            <Cafe />
            
        </Canvas>
    </div>
  )
}

export default Metaverse