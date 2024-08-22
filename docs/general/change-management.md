# Change Management / Change Control

> Originally from my notes taken on [11.20.2023](../notes/2023.md#m-11202023).

The process that management uses to identify, document and authorize changes to an IT environment. It minimizes the likelihood of disruptions, unauthorized alterations and errors.

## What are some common change control targets?

- Networks
- Servers
- Storage devices
- End-user devices
- Software

## How is change control delivered?

- As documented policies, implemented through the use of related operational procedures and related tools.

What are the primary goals and objectives?

- To manage and create a documented record of required changes and ensure that each change is implemented in the most cost effective, high quality manner with minimal disruption to operations.

## Roles and responsibilities

- **Change Requestor**: IT person requesting change; must attend change meeting or send delegate to discuss the change.
- **Change Implementer**: IT person that will actually perform the change
- **Change Tester(s)**: Business and IT personnel scheduled to test success of change
- **Change Advisory Board (CAB)**: Representatives from each functional area responsible for assessing the risk of changes requested.
- **Emergency Change Advisory Board (eCAB)**: Representatives from each functional area responsible for reviewing all emergency changes.
- **Customer/Client/End-user/Department**: The person or group that will be affected by the change.
- **Service Owner**: The staff accountable for the overall health of the service.

## What does a normal change process look like?

1. Requestor submits a request for change (RFC) with the following requirements:
    - The system that the change will be performed upon
    - Risk of Change
    - Complex changes need to provide drawings or process flows of the environment
    - Date of Change
    - Outage Window
    - Availability Impact
    - Customer/Client/End-user/Department impact
    - Change Steps, Test Plans, Back-out Process
2. The CAB meets weekly to review upcoming changes. **Note**: Emergency changes are not presented at the weekly CAB meeting. They are presented to the eCAB ASAP.
    - Outcomes:
        - Approved - Change is approved and scheduled
        - Denied - Change is rejected, which will result in the change going back to the initial state of "New", where the requestor may update or change whatever is needed based on CAB recommendations. Reasons may include not enough info, no representation at change meeting and/or risk too high.
3. Notifications of changes will be sent to all affected personnel.
4. Changes will begin at the assigned time and follow a change schedule. After the change is implemented, testing will begin.
5. RFC Closure
    - The requester must update the RFC and close it out with a status - Successful, failed/rollback . . .
    - The requester must update any disaster recovery plans that require modification based on the change.
    - The requester must update existing process documentation that require modification based on the change.

## What does an emergency change process look like?

1. Requestor submits an eRFC to the eCAB.
2. eCAB members will meet to approve the RFC within x hours.
    - **Note**: Approval is not required for implementation to occur.

## Types of changes

- Standard: Pre-authorized, low risk, low impact changes that follow documented, repeatable procedures. Standard changes are not reviewed by the CAB, but can only be made using a pre-approved template. Examples of these tasks include but are not limited to: software patches, backups and deploying new computers for a department.
- Normal: Normal changes will encompass the majority of changes reviewed by the CAB. All changes in this category will be presented to the CAB, and require CAB—and where appropriate—business unit approval. Normal changes include recurring changes, which are those that follow a predictable schedule, and project changes, which are sub-components of a larger change. Examples include:
    - Corrective changes required to correct a problem that currently exists and is impacting service availability
    - Continued service changes required to keep system up to date or respond to an alert
    - Add/Remove changes required to add or remove systems or services to/from the environment
    - Enhancements changes required to add or remove functionality of systems or services
- Emergency changes required to restore service or prevent an imminent disruption in service (break/fix only)
- Expedited changes required quickly due to a pressing need such as Customer/Client/End-user/Department requirements, a missed CAB deadline, or a vendor requirement but are not related to restoring service