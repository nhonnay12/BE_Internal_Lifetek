export const ROLES = {
    PM: 0,
    DEV: 1,
    TEST: 2,
    BA: 3,
    USER: 4,
};
export const STATUS = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    DONE: "DONE",
    REJECTED: "REJECTED",
};
export const PRIORITY = {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
};
export const TYPE = {
    TASK: "TASK",
    BUG: "BUG",
    STORY: "STORY",
};
export const COMMENT = {
    TASK: "TASK",
    BUG: "BUG",
    STORY: "STORY",
};
export const STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
};

export const PERMISSIONS = {
    PM: [
        "create_project",
        "update_project",
        "delete_project",
        "view_project",
        "create_task",
        "update_task",
        "delete_task",
        "view_task",
        "create_comment",
        "update_comment",
        "delete_comment",
        "view_comment",
        "assign_task",
        "change_status_task",
        "change_priority_task",
        "view_member",
        "add_member_project",
        "remove_member_project",
        "manage_role_project",
        "view_report",
    ],
    DEV: [
        "view_project",
        "view_task",
        "view_comment",
        "update_task",
        "create_comment",
        "change_status_task",
        "view_user",
    ],
    TEST: [
        "view_project",
        "view_task",
        "view_comment",
        "update_task",
        "create_comment",
        "change_status_task",
        "view_user",
    ],
    BA: [
        "view_project",
        "view_task",
        "view_comment",
        "update_task",
        "create_comment",
        "change_status_task",
        "view_user",
    ],
    USER: [
        "view_project",
        "view_task",
        "view_comment",
        "view_user",
    ],
};