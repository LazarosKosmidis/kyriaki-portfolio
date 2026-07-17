import {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle
} from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

import soundtrack from "../assets/audio/Sound_loosingmyreligion.mp3";

const SoundButton = forwardRef((props, ref) => {

    const audioRef = useRef(new Audio(soundtrack));
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = () => {

        if (isPlaying) return;

        audioRef.current.loop = true;
        audioRef.current.volume = 0.35;
        audioRef.current.play();

        setIsPlaying(true);
    };

    const toggleSound = () => {

        if (isPlaying) {

            audioRef.current.pause();
            setIsPlaying(false);

        } else {

            playAudio();
        }
    };

    useImperativeHandle(ref, () => ({
        playAudio
    }));

    return (

        <button
            className="sound-button"
            onClick={toggleSound}
        >
            {isPlaying
                ? <SpeakerHigh size={28} weight="regular" />
                : <SpeakerSlash size={28} weight="regular" />}
        </button>

    );
});

export default SoundButton;