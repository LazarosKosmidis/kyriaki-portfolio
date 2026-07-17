import { useRef, useState } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

import soundtrack from "../assets/audio/Sound_loosingmyreligion.mp3";

function SoundButton() {

    const audioRef = useRef(new Audio(soundtrack));

    const [isPlaying, setIsPlaying] = useState(false);

    const toggleSound = () => {

        if (isPlaying) {

            audioRef.current.pause();

        } else {

            audioRef.current.loop = true;
            audioRef.current.volume = 0.35;
            audioRef.current.play();

        }

        setIsPlaying(!isPlaying);
    };

    return (

        <button
            className="sound-button"
            onClick={toggleSound}
        >
            {isPlaying ? (
                <SpeakerHigh
                    size={28}
                    weight="regular"
                />
            ) : (
                <SpeakerSlash
                    size={28}
                    weight="regular"
                />
            )}
        </button>

    );
}

export default SoundButton;