const { useState } = React;

function App( ){
    const [room, setRoom] = useState({
        length: 500,
        width: 400,
        height: 270
    });

    const [settings, setSettings] = useState({
        frontChannels: true,
        centerChannel: true,
        subwooferCount: 1,
        sideSpeakers: true,
        sideMount: "wall",
        rearSpeakers: false,
        rearMount: "ear",
        ceilingSpeakers: true,
        ceilingCount: 2,
        ceilingType: "upward"
    });

    let ear_level = 0;
    if ( settings.frontChannels ){
        ear_level = ear_level + 2;
    }
    if ( settings.centerChannel ){
        ear_level = ear_level + 1;
    }
    if ( settings.sideSpeakers ){
        ear_level = ear_level + 2;
    }
    if ( settings.rearSpeakers ){
        ear_level = ear_level + 2;
    }

    let sub_count = settings.subwooferCount;
    let ceiling_count = settings.ceilingSpeakers ? settings.ceilingCount : 0;

    let layout_text = "";
    if ( ceiling_count > 0 ){
        layout_text = ear_level + "." + sub_count + "." + ceiling_count;
    }
    else {
        layout_text = ear_level + "." + sub_count;
    }

    let active_list = [];
    let all_speakers = window.speaker_list || [];

    for ( let i = 0 ; i < all_speakers.length ; i++ ){
        let s = all_speakers[i];
        if ( s.type == "front" && settings.frontChannels ){
            active_list.push( s );
        }
        else if ( s.type == "center" && settings.centerChannel ){
            active_list.push( s );
        }
        else if ( s.type == "subwoofer" ){
            if ( s.id == "SUB1" && settings.subwooferCount >= 1 ){
                active_list.push( s );
            }
            if ( s.id == "SUB2" && settings.subwooferCount >= 2 ){
                active_list.push( s );
            }
            if ( s.id == "SUB3" && settings.subwooferCount >= 3 ){
                active_list.push( s );
            }
            if ( s.id == "SUB4" && settings.subwooferCount >= 4 ){
                active_list.push( s );
            }
        }
        else if ( s.type == "side" && settings.sideSpeakers ){
            active_list.push( s );
        }
        else if ( s.type == "rear" && settings.rearSpeakers ){
            active_list.push( s );
        }
        else if ( s.type == "ceiling" && settings.ceilingSpeakers ){
            if ( (s.id == "TFL" || s.id == "TFR") && settings.ceilingCount >= 2 ){
                active_list.push( s );
            }
            if ( (s.id == "TRL" || s.id == "TRR") && settings.ceilingCount >= 4 ){
                active_list.push( s );
            }
        }
    }

    return (
        <div className="container">
            <Header layoutNotation={layout_text} />
            <InputPanel
                room={room}
                onRoomChange={setRoom}
                settings={settings}
                onSettingsChange={setSettings}
            />
            <BlueprintTable
                activeSpeakers={active_list}
                room={room}
                settings={settings}
            />
        </div>
    );
}

window.App = App;
