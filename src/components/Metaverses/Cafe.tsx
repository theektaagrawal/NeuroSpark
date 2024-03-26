import { Environment, useGLTF } from "@react-three/drei";
import { useFrame, RootState } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AnimationMixer, Object3D } from "three";
function Cafe()
{
    const gltf = useGLTF("./models/Cafe.gltf");
    const globalMixer = useRef<AnimationMixer>();
    const NPCMixer = useRef<AnimationMixer>();
    const AnimCamera = useRef<Object3D>();

    const NPCClips = ["Armature"]
    const playAnim = useRef(false);

    useFrame((state, delta) => {
        if (!state) return;//IDK WHY TODO CHANGE
        if (!globalMixer.current) CreateGlobalMixer();
        if (!NPCMixer.current) CreateNPCMixer();
        globalMixer.current?.update(delta);

        if(playAnim.current)NPCMixer.current?.update(delta);

        SetCameraPosition(state);
    })

    function CreateGlobalMixer() {
        if (gltf.animations.length) {
            globalMixer.current = new AnimationMixer(gltf.scene);
            gltf.animations.forEach(clip => {
                if (NPCClips.includes(clip.name)) return;
                const action = globalMixer.current?.clipAction(clip)
                action?.play();
            });
        }
    }
    function CreateNPCMixer() {
        if (gltf.animations.length) {
            NPCMixer.current = new AnimationMixer(gltf.scene);
            gltf.animations.forEach(clip => {
                if (!NPCClips.includes(clip.name)) return;
                const action = NPCMixer.current?.clipAction(clip)
                action?.play();
            });
        }
        NPCMixer.current?.update(0.01);
    }

    useEffect(() => {
        console.log(gltf.animations)
        AnimCamera.current = gltf.scene.getObjectByName("Camera");
        PlayAnimation(true);
    }, [gltf])

    function SetCameraPosition(state: RootState) {
        if (!AnimCamera.current) return;
        AnimCamera.current.getWorldPosition(state.camera.position);
        AnimCamera.current.getWorldQuaternion(state.camera.quaternion);
        state.camera.updateMatrixWorld();
    }

    function PlayAnimation(value: boolean)
    {
        playAnim.current = value;
        setTimeout(() => {
            playAnim.current = false;
        }, 5100);
    }

    return (
        <>
            <Environment files={'./models/comfy_cafe_2k.exr'} background />
            <primitive object={gltf.scene} />
        </>
    )
}

export default Cafe