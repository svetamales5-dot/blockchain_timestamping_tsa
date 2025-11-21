https://github.com/containerd/containerd/blob/main/api%2F1.2.pb.txthttps://github.com/containerd/containerd/blob/main/api%2F1.0.pb.txt  }
  message_type {
    name: "StatSnapshotRequest"
    field {
      name: "snapshotter"
      number: 1
      label: LABEL_OPTIONAL
      type: TYPE_STRING
      json_name: "snapshotter"
    }
    field {
      name: "key"
      number: 2
      label: LABEL_OPTIONAL
      type: TYPE_STRING
      json_name: "key"
    }
  }
  message_type {
    name: "Info"
    field {
      name: "name"
      number: 1
      label: LABEL_OPTIONAL
      type: TYPE_STRING
      json_name: "name"
    }
    field {
      name: "parent"
      number: 2
      label: LABEL_OPTIONAL
      type: TYPE_STRING
      json_name: "parent"
    }
    field {
      name: "kind"
      number: 3
      label: LABEL_OPTIONAL
      type: TYPE_ENUM
      type_name: ".containerd.services.snapshots.v1.Kind"
      json_name: "kind"
    }
    field {
      name: "created_at"
      number: 4
      label: LABEL_OPTIONAL
      type: TYPE_MESSAGE
      type_name: ".google.protobuf.Timestamp"
      options {
        65010: 1
        65001: 0
      }
      json_name: "createdAt"
    }
    field {
      name: "updated_at"
      number: 5
      label: LABEL_OPTIONAL
      type: TYPE_MESSAGE
      type_name: ".google.protobuf.Timestamp"
      options {
        65010: 1
        65001: 0
      }
      json_name: "updatedAt"
    }
    field {
      name: "labels"
      number: 6
      label: LABEL_REPEATED
      type: TYPE_MESSAGE
      type_name: ".containerd.services.snapshots.v1.Info.LabelsEntry"
      json_name: "labels"
    }
    nested_type {
      name: "LabelsEntry"
      field {
        name: "key"
        number: 1
        label: LABEL_OPTIONAL
        type: TYPE_STRING
        json_name: "key"
      }
      field {
        name: "value"
        number: 2
        label: LABEL_OPTIONAL
        type: TYPE_STRING
        json_name: "value"
      }
      options {
        map_entry: true
      }
    }
  }
  message_type {
    name: "StatSnapshotResponse"
    field {
      name: "info"
      number: 1
      label: LABEL_OPTIONAL
      type: TYPE_MESSAGE
      type_name: ".containerd.services.snapshots.v1.Info"
      options {
        65001: 0
      }
      json_name: "info"
    }
  }
  message_type {
    name: "UpdateSnapshotRequest"
    field {
      name: "snapshotter"
      number: 1
      label: LABEL_OPTIONAL
      type: TYPE_STRING
      json_name: "snapshotter"
    }
    field {
      name: "info"
      number: 2
      label: LABEL_OPTIONAL
      type: TYPE_MESSAGE
      type_name: ".containerd.services.snapshots.v1.Info"
      options {containerd.services.snapshots.v1.Infohttps://github.com/containerd/containerd/commit/2f24aa00a58de442713ea60e4206041e00dcf012# blochchain_timestamping_tsa
