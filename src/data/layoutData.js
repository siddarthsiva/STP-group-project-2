let ear_height = 110;

function create_speaker(id, name, type){
    return {
        id: id,
        name: name,
        type: type
    };
}
let speaker_list = [
    create_speaker("FL", "Front Left", "front"),
    create_speaker("FR", "Front Right", "front"),
    create_speaker("C", "Center Channel", "center"),
    create_speaker("SUB1", "Subwoofer 1", "subwoofer"),
    create_speaker("SUB2", "Subwoofer 2", "subwoofer"),
    create_speaker("SUB3", "Subwoofer 3", "subwoofer"),
    create_speaker("SUB4", "Subwoofer 4", "subwoofer"),

    create_speaker("SL", "Side Surround Left", "side"),
    create_speaker("SR", "Side Surround Right", "side"),
    create_speaker("RL", "Rear Surround Left", "rear"),
    create_speaker("RR", "Rear Surround Right", "rear"),
    create_speaker("TFL", "Top Front Left", "ceiling"),
    create_speaker("TFR", "Top Front Right", "ceiling"),
    create_speaker("TRL", "Top Rear Left", "ceiling"),
    create_speaker("TRR", "Top Rear Right", "ceiling")
];


function get_distance_2d(x1, y1, x2, y2){
    let dx = x1 - x2;
    let dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function radians_to_degrees(rad) {
    return rad * (180.0 / Math.PI);
}


function calculate_speaker_position(speaker, room, settings){
    let room_len = Number(room.length);
    let room_w = Number(room.width);
    let room_h = Number(room.height);

    let listener_x = room_w * 0.50;
    let listener_y = room_len * 0.62;
    let listener_z = ear_height;

    let speaker_x = 0;
    let speaker_y = 0;
    let speaker_z = ear_height;
    let mount_style = "Ear Level (~110 cm)";

    if (speaker.id == "FL") {
        speaker_x = room_w * 0.18;
        speaker_y = room_len * 0.10;
        speaker_z = 110;
        mount_style = "Ear Level (Stands/Towers)";
    } else if (speaker.id == "FR") {
        speaker_x = room_w * 0.82;
        speaker_y = room_len * 0.10;
        speaker_z = 110;
        mount_style = "Ear Level (Stands/Towers)";
    } else if (speaker.id == "C") {
        speaker_x = room_w * 0.50;
        speaker_y = room_len * 0.05;
        speaker_z = 110;
        mount_style = "Center (Ear Level)";
    } else if (speaker.id == "SUB1") {
        speaker_x = room_w * 0.25;
        speaker_y = room_len * 0.05;
        speaker_z = 0;
        mount_style = "Floor (Front Wall)";
    } else if (speaker.id == "SUB2") {
        speaker_x = room_w * 0.75;
        speaker_y = room_len * 0.95;
        speaker_z = 0;
        mount_style = "Floor (Rear Opposite Wall)";
    } else if (speaker.id == "SUB3") {
        speaker_x = room_w * 0.10;
        speaker_y = room_len * 0.90;
        speaker_z = 0;
        mount_style = "Floor (Corner Boundary)";
    } else if (speaker.id == "SUB4") {
        speaker_x = room_w * 0.90;
        speaker_y = room_len * 0.10;
        speaker_z = 0;
        mount_style = "Floor (Corner Boundary)";
    } else if (speaker.id == "SL" || speaker.id == "SR") {
        speaker_x = (speaker.id == "SL") ? room_w * 0.06 : room_w * 0.94;
        speaker_y = room_len * 0.62;
        if (settings && settings.sideMount == "wall") {
            speaker_z = Math.max(150, room_h - 40);
            mount_style = "Wall Mounted High";
        } else {
            speaker_z = 110;
            mount_style = "Ear Level (Stands)";
        }
    } else if (speaker.id == "RL" || speaker.id == "RR") {
        speaker_x = (speaker.id == "RL") ? room_w * 0.30 : room_w * 0.70;
        speaker_y = room_len * 0.92;
        if (settings && settings.rearMount == "wall") {
            speaker_z = Math.max(150, room_h - 40);
            mount_style = "Wall Mounted High";
        } else {
            speaker_z = 110;
            mount_style = "Ear Level (Stands)";
        }
    } else if (speaker.id == "TFL" || speaker.id == "TFR") {
        speaker_x = (speaker.id == "TFL") ? room_w * 0.25 : room_w * 0.75;
        speaker_y = room_len * 0.30;
        if (settings && settings.ceilingType == "upward") {
            speaker_z = 110;
            mount_style = "Upward Firing (Atop Front)";
        } else {
            speaker_z = room_h;
            mount_style = "Ceiling Mounted (Flush)";
        }
    } else if (speaker.id == "TRL" || speaker.id == "TRR") {
        speaker_x = (speaker.id == "TRL") ? room_w * 0.25 : room_w * 0.75;
        speaker_y = room_len * 0.75;
        if (settings && settings.ceilingType == "upward") {
            speaker_z = 110;
            mount_style = "Upward Firing (Atop Rear)";
        } else {
            speaker_z = room_h;
            mount_style = "Ceiling Mounted (Flush)";
        }
    }

    let from_front = Math.round(speaker_y);
    let from_side = Math.round(Math.min(speaker_x, room_w - speaker_x));

    let dist_2d = get_distance_2d(speaker_x, speaker_y, listener_x, listener_y);
    let diff_z = speaker_z - listener_z;
    let dist_listener = Math.round(Math.sqrt(dist_2d * dist_2d + diff_z * diff_z));

    let dx = speaker_x - listener_x;
    let dy = speaker_y - listener_y;
    let horiz_text = "0° (Straight)";

    if (speaker.type != "subwoofer") {
        let angle_rad = Math.atan2(Math.abs(dx), Math.abs(dy));
        let angle_deg = Math.round(radians_to_degrees(angle_rad));
        if (angle_deg > 0) {
            horiz_text = angle_deg + "° Inward";
        }
    } else {
        horiz_text = "Non-directional";
    }

    let vert_text = "0° (Level)";
    if (speaker.type == "subwoofer") {
        vert_text = "Floor (0°)";
    } else if (mount_style.includes("Upward Firing")) {
        vert_text = "20° Upward (Bounce)";
    } else if (speaker_z > listener_z) {
        let diff = speaker_z - listener_z;
        let tilt_rad = Math.atan2(diff, dist_2d);
        let tilt_deg = Math.round(radians_to_degrees(tilt_rad));
        vert_text = tilt_deg + "° Down-Tilt";
    } else if (speaker_z < listener_z) {
        let diff = listener_z - speaker_z;
        let tilt_rad = Math.atan2(diff, dist_2d);
        let tilt_deg = Math.round(radians_to_degrees(tilt_rad));
        vert_text = tilt_deg + "° Up-Tilt";
    }

    return {
        fromFrontWall: from_front,
        fromSideWall: from_side,
        mountingHeight: Math.round(speaker_z),
        mountingStyle: mount_style,
        horizontalAngle: horiz_text,
        verticalAngle: vert_text,
        distanceToListener: dist_listener
    };
}

window.speaker_list = speaker_list;
window.calculate_speaker_position = calculate_speaker_position;