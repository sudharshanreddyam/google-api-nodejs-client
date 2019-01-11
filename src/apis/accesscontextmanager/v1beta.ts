/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {AxiosPromise} from 'axios';
import {Compute, JWT, OAuth2Client, UserRefreshClient} from 'google-auth-library';
import {APIRequestContext, BodyResponseCallback, createAPIRequest, GlobalOptions, GoogleConfigurable, MethodOptions} from 'googleapis-common';

// tslint:disable: no-any
// tslint:disable: class-name
// tslint:disable: variable-name
// tslint:disable: jsdoc-format
// tslint:disable: no-namespace

export namespace accesscontextmanager_v1beta {
  export interface Options extends GlobalOptions {
    version: 'v1beta';
  }

  let context: APIRequestContext;

  interface StandardParameters {
    /**
     * V1 error format.
     */
    '$.xgafv'?: string;
    /**
     * OAuth access token.
     */
    access_token?: string;
    /**
     * Data format for response.
     */
    alt?: string;
    /**
     * JSONP
     */
    callback?: string;
    /**
     * Selector specifying which fields to include in a partial response.
     */
    fields?: string;
    /**
     * API key. Your API key identifies your project and provides you with API
     * access, quota, and reports. Required unless you provide an OAuth 2.0
     * token.
     */
    key?: string;
    /**
     * OAuth 2.0 token for the current user.
     */
    oauth_token?: string;
    /**
     * Returns response with indentations and line breaks.
     */
    prettyPrint?: boolean;
    /**
     * Available to use for quota purposes for server-side applications. Can be
     * any arbitrary string assigned to a user, but should not exceed 40
     * characters.
     */
    quotaUser?: string;
    /**
     * Legacy upload protocol for media (e.g. "media", "multipart").
     */
    uploadType?: string;
    /**
     * Upload protocol for media (e.g. "raw", "multipart").
     */
    upload_protocol?: string;
  }

  /**
   * Access Context Manager API
   *
   * An API for setting attribute based access control to requests to GCP
   * services.
   *
   * @example
   * const {google} = require('googleapis');
   * const accesscontextmanager = google.accesscontextmanager('v1beta');
   *
   * @namespace accesscontextmanager
   * @type {Function}
   * @version v1beta
   * @variation v1beta
   * @param {object=} options Options for Accesscontextmanager
   */
  export class Accesscontextmanager {
    accessPolicies: Resource$Accesspolicies;
    operations: Resource$Operations;

    constructor(options: GlobalOptions, google?: GoogleConfigurable) {
      context = {_options: options || {}, google};

      this.accessPolicies = new Resource$Accesspolicies();
      this.operations = new Resource$Operations();
    }
  }

  /**
   * An `AccessLevel` is a label that can be applied to requests to GCP
   * services, along with a list of requirements necessary for the label to be
   * applied.
   */
  export interface Schema$AccessLevel {
    /**
     * A `BasicLevel` composed of `Conditions`.
     */
    basic?: Schema$BasicLevel;
    /**
     * Output only. Time the `AccessLevel` was created in UTC.
     */
    createTime?: string;
    /**
     * Description of the `AccessLevel` and its use. Does not affect behavior.
     */
    description?: string;
    /**
     * Required. Resource name for the Access Level. The `short_name` component
     * must begin with a letter and only include alphanumeric and &#39;_&#39;.
     * Format: `accessPolicies/{policy_id}/accessLevels/{short_name}`
     */
    name?: string;
    /**
     * Human readable title. Must be unique within the Policy.
     */
    title?: string;
    /**
     * Output only. Time the `AccessLevel` was updated in UTC.
     */
    updateTime?: string;
  }
  /**
   * `AccessPolicy` is a container for `AccessLevels` (which define the
   * necessary attributes to use GCP services) and `ServicePerimeters` (which
   * define regions of services able to freely pass data within a perimeter). An
   * access policy is globally visible within an organization, and the
   * restrictions it specifies apply to all projects within an organization.
   */
  export interface Schema$AccessPolicy {
    /**
     * Output only. Time the `AccessPolicy` was created in UTC.
     */
    createTime?: string;
    /**
     * Output only. Resource name of the `AccessPolicy`. Format:
     * `accessPolicies/{policy_id}`
     */
    name?: string;
    /**
     * Required. The parent of this `AccessPolicy` in the Cloud Resource
     * Hierarchy. Currently immutable once created. Format:
     * `organizations/{organization_id}`
     */
    parent?: string;
    /**
     * Required. Human readable title. Does not affect behavior.
     */
    title?: string;
    /**
     * Output only. Time the `AccessPolicy` was updated in UTC.
     */
    updateTime?: string;
  }
  /**
   * `BasicLevel` is an `AccessLevel` using a set of recommended features.
   */
  export interface Schema$BasicLevel {
    /**
     * How the `conditions` list should be combined to determine if a request is
     * granted this `AccessLevel`. If AND is used, each `Condition` in
     * `conditions` must be satisfied for the `AccessLevel` to be applied. If OR
     * is used, at least one `Condition` in `conditions` must be satisfied for
     * the `AccessLevel` to be applied. Default behavior is AND.
     */
    combiningFunction?: string;
    /**
     * Required. A list of requirements for the `AccessLevel` to be granted.
     */
    conditions?: Schema$Condition[];
  }
  /**
   * A condition necessary for an `AccessLevel` to be granted. The Condition is
   * an AND over its fields. So a Condition is true if: 1) the request IP is
   * from one of the listed subnetworks AND 2) the originating device complies
   * with the listed device policy AND 3) all listed access levels are granted
   * AND 4) the request was sent at a time allowed by the DateTimeRestriction.
   */
  export interface Schema$Condition {
    /**
     * Device specific restrictions, all restrictions must hold for the
     * Condition to be true. If not specified, all devices are allowed.
     */
    devicePolicy?: Schema$DevicePolicy;
    /**
     * CIDR block IP subnetwork specification. May be IPv4 or IPv6. Note that
     * for a CIDR IP address block, the specified IP address portion must be
     * properly truncated (i.e. all the host bits must be zero) or the input is
     * considered malformed. For example, &quot;192.0.2.0/24&quot; is accepted
     * but &quot;192.0.2.1/24&quot; is not. Similarly, for IPv6,
     * &quot;2001:db8::/32&quot; is accepted whereas &quot;2001:db8::1/32&quot;
     * is not. The originating IP of a request must be in one of the listed
     * subnets in order for this Condition to be true. If empty, all IP
     * addresses are allowed.
     */
    ipSubnetworks?: string[];
    /**
     * The signed-in user originating the request must be a part of one of the
     * provided members. Syntax: `user:{emailid}` `group:{emailid}`
     * `serviceAccount:{emailid}` If not specified, a request may come from any
     * user (logged in/not logged in, not present in any groups, etc.).
     */
    members?: string[];
    /**
     * Whether to negate the Condition. If true, the Condition becomes a NAND
     * over its non-empty fields, each field must be false for the Condition
     * overall to be satisfied. Defaults to false.
     */
    negate?: boolean;
    /**
     * A list of other access levels defined in the same `Policy`, referenced by
     * resource name. Referencing an `AccessLevel` which does not exist is an
     * error. All access levels listed must be granted for the Condition to be
     * true. Example:
     * &quot;`accessPolicies/MY_POLICY/accessLevels/LEVEL_NAME&quot;`
     */
    requiredAccessLevels?: string[];
  }
  /**
   * `DevicePolicy` specifies device specific restrictions necessary to acquire
   * a given access level. A `DevicePolicy` specifies requirements for requests
   * from devices to be granted access levels, it does not do any enforcement on
   * the device. `DevicePolicy` acts as an AND over all specified fields, and
   * each repeated field is an OR over its elements. Any unset fields are
   * ignored. For example, if the proto is { os_type : DESKTOP_WINDOWS, os_type
   * : DESKTOP_LINUX, encryption_status: ENCRYPTED}, then the DevicePolicy will
   * be true for requests originating from encrypted Linux desktops and
   * encrypted Windows desktops.
   */
  export interface Schema$DevicePolicy {
    /**
     * Allowed device management levels, an empty list allows all management
     * levels.
     */
    allowedDeviceManagementLevels?: string[];
    /**
     * Allowed encryptions statuses, an empty list allows all statuses.
     */
    allowedEncryptionStatuses?: string[];
    /**
     * Allowed OS versions, an empty list allows all types and all versions.
     */
    osConstraints?: Schema$OsConstraint[];
    /**
     * Whether or not screenlock is required for the DevicePolicy to be true.
     * Defaults to `false`.
     */
    requireScreenlock?: boolean;
  }
  /**
   * A response to `ListAccessLevelsRequest`.
   */
  export interface Schema$ListAccessLevelsResponse {
    /**
     * List of the Access Level instances.
     */
    accessLevels?: Schema$AccessLevel[];
    /**
     * The pagination token to retrieve the next page of results. If the value
     * is empty, no further results remain.
     */
    nextPageToken?: string;
  }
  /**
   * A response to `ListAccessPoliciesRequest`.
   */
  export interface Schema$ListAccessPoliciesResponse {
    /**
     * List of the AccessPolicy instances.
     */
    accessPolicies?: Schema$AccessPolicy[];
    /**
     * The pagination token to retrieve the next page of results. If the value
     * is empty, no further results remain.
     */
    nextPageToken?: string;
  }
  /**
   * A response to `ListServicePerimetersRequest`.
   */
  export interface Schema$ListServicePerimetersResponse {
    /**
     * The pagination token to retrieve the next page of results. If the value
     * is empty, no further results remain.
     */
    nextPageToken?: string;
    /**
     * List of the Service Perimeter instances.
     */
    servicePerimeters?: Schema$ServicePerimeter[];
  }
  /**
   * This resource represents a long-running operation that is the result of a
   * network API call.
   */
  export interface Schema$Operation {
    /**
     * If the value is `false`, it means the operation is still in progress. If
     * `true`, the operation is completed, and either `error` or `response` is
     * available.
     */
    done?: boolean;
    /**
     * The error result of the operation in case of failure or cancellation.
     */
    error?: Schema$Status;
    /**
     * Service-specific metadata associated with the operation.  It typically
     * contains progress information and common metadata such as create time.
     * Some services might not provide such metadata.  Any method that returns a
     * long-running operation should document the metadata type, if any.
     */
    metadata?: {[key: string]: any;};
    /**
     * The server-assigned name, which is only unique within the same service
     * that originally returns it. If you use the default HTTP mapping, the
     * `name` should have the format of `operations/some/unique/name`.
     */
    name?: string;
    /**
     * The normal response of the operation in case of success.  If the original
     * method returns no data on success, such as `Delete`, the response is
     * `google.protobuf.Empty`.  If the original method is standard
     * `Get`/`Create`/`Update`, the response should be the resource.  For other
     * methods, the response should have the type `XxxResponse`, where `Xxx` is
     * the original method name.  For example, if the original method name is
     * `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
     */
    response?: {[key: string]: any;};
  }
  /**
   * A restriction on the OS type and version of devices making requests.
   */
  export interface Schema$OsConstraint {
    /**
     * The minimum allowed OS version. If not set, any version of this OS
     * satisfies the constraint. Format: `&quot;major.minor.patch&quot;`.
     * Examples: `&quot;10.5.301&quot;`, `&quot;9.2.1&quot;`.
     */
    minimumVersion?: string;
    /**
     * Required. The allowed OS type.
     */
    osType?: string;
  }
  /**
   * `ServicePerimeter` describes a set of GCP resources which can freely import
   * and export data amongst themselves, but not export outside of the
   * `ServicePerimeter`. If a request with a source within this
   * `ServicePerimeter` has a target outside of the `ServicePerimeter`, the
   * request will be blocked. Otherwise the request is allowed. There are two
   * types of Service Perimeter - Regular and Bridge. Regular Service Perimeters
   * cannot overlap, a single GCP project can only belong to a single regular
   * Service Perimeter. Service Perimeter Bridges can contain only GCP projects
   * as members, a single GCP project may belong to multiple Service Perimeter
   * Bridges.
   */
  export interface Schema$ServicePerimeter {
    /**
     * Output only. Time the `ServicePerimeter` was created in UTC.
     */
    createTime?: string;
    /**
     * Description of the `ServicePerimeter` and its use. Does not affect
     * behavior.
     */
    description?: string;
    /**
     * Required. Resource name for the ServicePerimeter.  The `short_name`
     * component must begin with a letter and only include alphanumeric and
     * &#39;_&#39;. Format:
     * `accessPolicies/{policy_id}/servicePerimeters/{short_name}`
     */
    name?: string;
    /**
     * Perimeter type indicator. A single project is allowed to be a member of
     * single regular perimeter, but multiple service perimeter bridges. A
     * project cannot be a included in a perimeter bridge without being included
     * in regular perimeter. For perimeter bridges, restricted/unrestricted
     * service lists as well as access lists must be empty.
     */
    perimeterType?: string;
    /**
     * Current ServicePerimeter configuration. Specifies sets of resources,
     * restricted/unrestricted services and access levels that determine
     * perimeter content and boundaries.
     */
    status?: Schema$ServicePerimeterConfig;
    /**
     * Human readable title. Must be unique within the Policy.
     */
    title?: string;
    /**
     * Output only. Time the `ServicePerimeter` was updated in UTC.
     */
    updateTime?: string;
  }
  /**
   * `ServicePerimeterConfig` specifies a set of GCP resources that describe
   * specific Service Perimeter configuration.
   */
  export interface Schema$ServicePerimeterConfig {
    /**
     * A list of `AccessLevel` resource names that allow resources within the
     * `ServicePerimeter` to be accessed from the internet. `AccessLevels`
     * listed must be in the same policy as this `ServicePerimeter`. Referencing
     * a nonexistent `AccessLevel` is a syntax error. If no `AccessLevel` names
     * are listed, resources within the perimeter can only be accessed via GCP
     * calls with request origins within the perimeter. Example:
     * `&quot;accessPolicies/MY_POLICY/accessLevels/MY_LEVEL&quot;`. For Service
     * Perimeter Bridge, must be empty.
     */
    accessLevels?: string[];
    /**
     * A list of GCP resources that are inside of the service perimeter.
     * Currently only projects are allowed. Format: `projects/{project_number}`
     */
    resources?: string[];
    /**
     * GCP services that are subject to the Service Perimeter restrictions. May
     * contain a list of services or a single wildcard &quot;*&quot;. For
     * example, if `storage.googleapis.com` is specified, access to the storage
     * buckets inside the perimeter must meet the perimeter&#39;s access
     * restrictions.  Wildcard means that unless explicitly specified by
     * &quot;unrestricted_services&quot; list, any service is treated as
     * restricted. One of the fields &quot;restricted_services&quot;,
     * &quot;unrestricted_services&quot; must contain a wildcard &quot;*&quot;,
     * otherwise the Service Perimeter specification is invalid. It also means
     * that both field being empty is invalid as well.
     * &quot;restricted_services&quot; can be empty if and only if
     * &quot;unrestricted_services&quot; list contains a &quot;*&quot; wildcard.
     */
    restrictedServices?: string[];
    /**
     * GCP services that are not subject to the Service Perimeter restrictions.
     * May contain a list of services or a single wildcard &quot;*&quot;. For
     * example, if `logging.googleapis.com` is unrestricted, users can access
     * logs inside the perimeter as if the perimeter doesn&#39;t exist, and it
     * also means VMs inside the perimeter can access logs outside the
     * perimeter.  The wildcard means that unless explicitly specified by
     * &quot;restricted_services&quot; list, any service is treated as
     * unrestricted. One of the fields &quot;restricted_services&quot;,
     * &quot;unrestricted_services&quot; must contain a wildcard &quot;*&quot;,
     * otherwise the Service Perimeter specification is invalid. It also means
     * that both field being empty is invalid as well.
     * &quot;unrestricted_services&quot; can be empty if and only if
     * &quot;restricted_services&quot; list contains a &quot;*&quot; wildcard.
     */
    unrestrictedServices?: string[];
  }
  /**
   * The `Status` type defines a logical error model that is suitable for
   * different programming environments, including REST APIs and RPC APIs. It is
   * used by [gRPC](https://github.com/grpc). The error model is designed to be:
   * - Simple to use and understand for most users - Flexible enough to meet
   * unexpected needs  # Overview  The `Status` message contains three pieces of
   * data: error code, error message, and error details. The error code should
   * be an enum value of google.rpc.Code, but it may accept additional error
   * codes if needed.  The error message should be a developer-facing English
   * message that helps developers *understand* and *resolve* the error. If a
   * localized user-facing error message is needed, put the localized message in
   * the error details or localize it in the client. The optional error details
   * may contain arbitrary information about the error. There is a predefined
   * set of error detail types in the package `google.rpc` that can be used for
   * common error conditions.  # Language mapping  The `Status` message is the
   * logical representation of the error model, but it is not necessarily the
   * actual wire format. When the `Status` message is exposed in different
   * client libraries and different wire protocols, it can be mapped
   * differently. For example, it will likely be mapped to some exceptions in
   * Java, but more likely mapped to some error codes in C.  # Other uses  The
   * error model and the `Status` message can be used in a variety of
   * environments, either with or without APIs, to provide a consistent
   * developer experience across different environments.  Example uses of this
   * error model include:  - Partial errors. If a service needs to return
   * partial errors to the client,     it may embed the `Status` in the normal
   * response to indicate the partial     errors.  - Workflow errors. A typical
   * workflow has multiple steps. Each step may     have a `Status` message for
   * error reporting.  - Batch operations. If a client uses batch request and
   * batch response, the     `Status` message should be used directly inside
   * batch response, one for     each error sub-response.  - Asynchronous
   * operations. If an API call embeds asynchronous operation     results in its
   * response, the status of those operations should be     represented directly
   * using the `Status` message.  - Logging. If some API errors are stored in
   * logs, the message `Status` could     be used directly after any stripping
   * needed for security/privacy reasons.
   */
  export interface Schema$Status {
    /**
     * The status code, which should be an enum value of google.rpc.Code.
     */
    code?: number;
    /**
     * A list of messages that carry the error details.  There is a common set
     * of message types for APIs to use.
     */
    details?: Array<{[key: string]: any;}>;
    /**
     * A developer-facing error message, which should be in English. Any
     * user-facing error message should be localized and sent in the
     * google.rpc.Status.details field, or localized by the client.
     */
    message?: string;
  }


  export class Resource$Accesspolicies {
    accessLevels: Resource$Accesspolicies$Accesslevels;
    servicePerimeters: Resource$Accesspolicies$Serviceperimeters;
    constructor() {
      this.accessLevels = new Resource$Accesspolicies$Accesslevels();
      this.servicePerimeters = new Resource$Accesspolicies$Serviceperimeters();
    }


    /**
     * accesscontextmanager.accessPolicies.create
     * @desc Create an `AccessPolicy`. Fails if this organization already has a
     * `AccessPolicy`. The longrunning Operation will have a successful status
     * once the `AccessPolicy` has propagated to long-lasting storage. Syntactic
     * and basic semantic errors will be returned in `metadata` as a BadRequest
     * proto.
     * @alias accesscontextmanager.accessPolicies.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {().AccessPolicy} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
        params?: Params$Resource$Accesspolicies$Create,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    create(
        params: Params$Resource$Accesspolicies$Create,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    create(
        params: Params$Resource$Accesspolicies$Create,
        callback: BodyResponseCallback<Schema$Operation>): void;
    create(callback: BodyResponseCallback<Schema$Operation>): void;
    create(
        paramsOrCallback?: Params$Resource$Accesspolicies$Create|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Accesspolicies$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/accessPolicies')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'POST'
            },
            options),
        params,
        requiredParams: [],
        pathParams: [],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.delete
     * @desc Delete an AccessPolicy by resource name. The longrunning Operation
     * will have a successful status once the AccessPolicy has been removed from
     * long-lasting storage.
     * @alias accesscontextmanager.accessPolicies.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. Resource name for the access policy to delete.  Format `accessPolicies/{policy_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
        params?: Params$Resource$Accesspolicies$Delete,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    delete(
        params: Params$Resource$Accesspolicies$Delete,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    delete(
        params: Params$Resource$Accesspolicies$Delete,
        callback: BodyResponseCallback<Schema$Operation>): void;
    delete(callback: BodyResponseCallback<Schema$Operation>): void;
    delete(
        paramsOrCallback?: Params$Resource$Accesspolicies$Delete|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Accesspolicies$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'DELETE'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.get
     * @desc Get an AccessPolicy by name.
     * @alias accesscontextmanager.accessPolicies.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. Resource name for the access policy to get.  Format `accessPolicies/{policy_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(params?: Params$Resource$Accesspolicies$Get,
        options?: MethodOptions): AxiosPromise<Schema$AccessPolicy>;
    get(params: Params$Resource$Accesspolicies$Get,
        options: MethodOptions|BodyResponseCallback<Schema$AccessPolicy>,
        callback: BodyResponseCallback<Schema$AccessPolicy>): void;
    get(params: Params$Resource$Accesspolicies$Get,
        callback: BodyResponseCallback<Schema$AccessPolicy>): void;
    get(callback: BodyResponseCallback<Schema$AccessPolicy>): void;
    get(paramsOrCallback?: Params$Resource$Accesspolicies$Get|
        BodyResponseCallback<Schema$AccessPolicy>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$AccessPolicy>,
        callback?: BodyResponseCallback<Schema$AccessPolicy>):
        void|AxiosPromise<Schema$AccessPolicy> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Accesspolicies$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$AccessPolicy>(parameters, callback);
      } else {
        return createAPIRequest<Schema$AccessPolicy>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.list
     * @desc List all AccessPolicies under a container.
     * @alias accesscontextmanager.accessPolicies.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize Number of AccessPolicy instances to include in the list. Default 100.
     * @param {string=} params.pageToken Next page token for the next batch of AccessPolicy instances. Defaults to the first page of results.
     * @param {string=} params.parent Required. Resource name for the container to list AccessPolicy instances from.  Format: `organizations/{org_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(params?: Params$Resource$Accesspolicies$List, options?: MethodOptions):
        AxiosPromise<Schema$ListAccessPoliciesResponse>;
    list(
        params: Params$Resource$Accesspolicies$List,
        options: MethodOptions|
        BodyResponseCallback<Schema$ListAccessPoliciesResponse>,
        callback: BodyResponseCallback<Schema$ListAccessPoliciesResponse>):
        void;
    list(
        params: Params$Resource$Accesspolicies$List,
        callback: BodyResponseCallback<Schema$ListAccessPoliciesResponse>):
        void;
    list(callback: BodyResponseCallback<Schema$ListAccessPoliciesResponse>):
        void;
    list(
        paramsOrCallback?: Params$Resource$Accesspolicies$List|
        BodyResponseCallback<Schema$ListAccessPoliciesResponse>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ListAccessPoliciesResponse>,
        callback?: BodyResponseCallback<Schema$ListAccessPoliciesResponse>):
        void|AxiosPromise<Schema$ListAccessPoliciesResponse> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Accesspolicies$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/accessPolicies')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: [],
        pathParams: [],
        context
      };
      if (callback) {
        createAPIRequest<Schema$ListAccessPoliciesResponse>(
            parameters, callback);
      } else {
        return createAPIRequest<Schema$ListAccessPoliciesResponse>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.patch
     * @desc Update an AccessPolicy. The longrunning Operation from this RPC
     * will have a successful status once the changes to the AccessPolicy have
     * propagated to long-lasting storage. Syntactic and basic semantic errors
     * will be returned in `metadata` as a BadRequest proto.
     * @alias accesscontextmanager.accessPolicies.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Output only. Resource name of the `AccessPolicy`. Format: `accessPolicies/{policy_id}`
     * @param {string=} params.updateMask Required. Mask to control which fields get updated. Must be non-empty.
     * @param {().AccessPolicy} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
        params?: Params$Resource$Accesspolicies$Patch,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    patch(
        params: Params$Resource$Accesspolicies$Patch,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    patch(
        params: Params$Resource$Accesspolicies$Patch,
        callback: BodyResponseCallback<Schema$Operation>): void;
    patch(callback: BodyResponseCallback<Schema$Operation>): void;
    patch(
        paramsOrCallback?: Params$Resource$Accesspolicies$Patch|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params =
          (paramsOrCallback || {}) as Params$Resource$Accesspolicies$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'PATCH'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Accesspolicies$Create extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;


    /**
     * Request body metadata
     */
    requestBody?: Schema$AccessPolicy;
  }
  export interface Params$Resource$Accesspolicies$Delete extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the access policy to delete.  Format
     * `accessPolicies/{policy_id}`
     */
    name?: string;
  }
  export interface Params$Resource$Accesspolicies$Get extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the access policy to get.  Format
     * `accessPolicies/{policy_id}`
     */
    name?: string;
  }
  export interface Params$Resource$Accesspolicies$List extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Number of AccessPolicy instances to include in the list. Default 100.
     */
    pageSize?: number;
    /**
     * Next page token for the next batch of AccessPolicy instances. Defaults to
     * the first page of results.
     */
    pageToken?: string;
    /**
     * Required. Resource name for the container to list AccessPolicy instances
     * from.  Format: `organizations/{org_id}`
     */
    parent?: string;
  }
  export interface Params$Resource$Accesspolicies$Patch extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Output only. Resource name of the `AccessPolicy`. Format:
     * `accessPolicies/{policy_id}`
     */
    name?: string;
    /**
     * Required. Mask to control which fields get updated. Must be non-empty.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$AccessPolicy;
  }

  export class Resource$Accesspolicies$Accesslevels {
    constructor() {}


    /**
     * accesscontextmanager.accessPolicies.accessLevels.create
     * @desc Create an Access Level. The longrunning operation from this RPC
     * will have a successful status once the Access Level has propagated to
     * long-lasting storage. Access Levels containing errors will result in an
     * error response for the first error encountered.
     * @alias accesscontextmanager.accessPolicies.accessLevels.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. Resource name for the access policy which owns this Access Level.  Format: `accessPolicies/{policy_id}`
     * @param {().AccessLevel} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
        params?: Params$Resource$Accesspolicies$Accesslevels$Create,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    create(
        params: Params$Resource$Accesspolicies$Accesslevels$Create,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    create(
        params: Params$Resource$Accesspolicies$Accesslevels$Create,
        callback: BodyResponseCallback<Schema$Operation>): void;
    create(callback: BodyResponseCallback<Schema$Operation>): void;
    create(
        paramsOrCallback?: Params$Resource$Accesspolicies$Accesslevels$Create|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Accesslevels$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Accesslevels$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+parent}/accessLevels')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'POST'
            },
            options),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.accessLevels.delete
     * @desc Delete an Access Level by resource name. The longrunning operation
     * from this RPC will have a successful status once the Access Level has
     * been removed from long-lasting storage.
     * @alias accesscontextmanager.accessPolicies.accessLevels.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. Resource name for the Access Level.  Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
        params?: Params$Resource$Accesspolicies$Accesslevels$Delete,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    delete(
        params: Params$Resource$Accesspolicies$Accesslevels$Delete,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    delete(
        params: Params$Resource$Accesspolicies$Accesslevels$Delete,
        callback: BodyResponseCallback<Schema$Operation>): void;
    delete(callback: BodyResponseCallback<Schema$Operation>): void;
    delete(
        paramsOrCallback?: Params$Resource$Accesspolicies$Accesslevels$Delete|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Accesslevels$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Accesslevels$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'DELETE'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.accessLevels.get
     * @desc Get an Access Level by resource name.
     * @alias accesscontextmanager.accessPolicies.accessLevels.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.accessLevelFormat Whether to return `BasicLevels` in the Cloud Common Expression Language rather than as `BasicLevels`. Defaults to AS_DEFINED, where Access Levels are returned as `BasicLevels` or `CustomLevels` based on how they were created. If set to CEL, all Access Levels are returned as `CustomLevels`. In the CEL case, `BasicLevels` are translated to equivalent `CustomLevels`.
     * @param {string} params.name Required. Resource name for the Access Level.  Format: `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(params?: Params$Resource$Accesspolicies$Accesslevels$Get,
        options?: MethodOptions): AxiosPromise<Schema$AccessLevel>;
    get(params: Params$Resource$Accesspolicies$Accesslevels$Get,
        options: MethodOptions|BodyResponseCallback<Schema$AccessLevel>,
        callback: BodyResponseCallback<Schema$AccessLevel>): void;
    get(params: Params$Resource$Accesspolicies$Accesslevels$Get,
        callback: BodyResponseCallback<Schema$AccessLevel>): void;
    get(callback: BodyResponseCallback<Schema$AccessLevel>): void;
    get(paramsOrCallback?: Params$Resource$Accesspolicies$Accesslevels$Get|
        BodyResponseCallback<Schema$AccessLevel>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$AccessLevel>,
        callback?: BodyResponseCallback<Schema$AccessLevel>):
        void|AxiosPromise<Schema$AccessLevel> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Accesslevels$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Accesslevels$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$AccessLevel>(parameters, callback);
      } else {
        return createAPIRequest<Schema$AccessLevel>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.accessLevels.list
     * @desc List all Access Levels for an access policy.
     * @alias accesscontextmanager.accessPolicies.accessLevels.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string=} params.accessLevelFormat Whether to return `BasicLevels` in the Cloud Common Expression language, as `CustomLevels`, rather than as `BasicLevels`. Defaults to returning `AccessLevels` in the format they were defined.
     * @param {integer=} params.pageSize Number of Access Levels to include in the list. Default 100.
     * @param {string=} params.pageToken Next page token for the next batch of Access Level instances. Defaults to the first page of results.
     * @param {string} params.parent Required. Resource name for the access policy to list Access Levels from.  Format: `accessPolicies/{policy_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
        params?: Params$Resource$Accesspolicies$Accesslevels$List,
        options?: MethodOptions): AxiosPromise<Schema$ListAccessLevelsResponse>;
    list(
        params: Params$Resource$Accesspolicies$Accesslevels$List,
        options: MethodOptions|
        BodyResponseCallback<Schema$ListAccessLevelsResponse>,
        callback: BodyResponseCallback<Schema$ListAccessLevelsResponse>): void;
    list(
        params: Params$Resource$Accesspolicies$Accesslevels$List,
        callback: BodyResponseCallback<Schema$ListAccessLevelsResponse>): void;
    list(callback: BodyResponseCallback<Schema$ListAccessLevelsResponse>): void;
    list(
        paramsOrCallback?: Params$Resource$Accesspolicies$Accesslevels$List|
        BodyResponseCallback<Schema$ListAccessLevelsResponse>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ListAccessLevelsResponse>,
        callback?: BodyResponseCallback<Schema$ListAccessLevelsResponse>):
        void|AxiosPromise<Schema$ListAccessLevelsResponse> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Accesslevels$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Accesslevels$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+parent}/accessLevels')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$ListAccessLevelsResponse>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ListAccessLevelsResponse>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.accessLevels.patch
     * @desc Update an Access Level. The longrunning operation from this RPC
     * will have a successful status once the changes to the Access Level have
     * propagated to long-lasting storage. Access Levels containing errors will
     * result in an error response for the first error encountered.
     * @alias accesscontextmanager.accessPolicies.accessLevels.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. Resource name for the Access Level. The `short_name` component must begin with a letter and only include alphanumeric and '_'. Format: `accessPolicies/{policy_id}/accessLevels/{short_name}`
     * @param {string=} params.updateMask Required.  Mask to control which fields get updated. Must be non-empty.
     * @param {().AccessLevel} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
        params?: Params$Resource$Accesspolicies$Accesslevels$Patch,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    patch(
        params: Params$Resource$Accesspolicies$Accesslevels$Patch,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    patch(
        params: Params$Resource$Accesspolicies$Accesslevels$Patch,
        callback: BodyResponseCallback<Schema$Operation>): void;
    patch(callback: BodyResponseCallback<Schema$Operation>): void;
    patch(
        paramsOrCallback?: Params$Resource$Accesspolicies$Accesslevels$Patch|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Accesslevels$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Accesslevels$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'PATCH'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Accesspolicies$Accesslevels$Create extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the access policy which owns this Access
     * Level.  Format: `accessPolicies/{policy_id}`
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$AccessLevel;
  }
  export interface Params$Resource$Accesspolicies$Accesslevels$Delete extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the Access Level.  Format:
     * `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
     */
    name?: string;
  }
  export interface Params$Resource$Accesspolicies$Accesslevels$Get extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Whether to return `BasicLevels` in the Cloud Common Expression Language
     * rather than as `BasicLevels`. Defaults to AS_DEFINED, where Access Levels
     * are returned as `BasicLevels` or `CustomLevels` based on how they were
     * created. If set to CEL, all Access Levels are returned as `CustomLevels`.
     * In the CEL case, `BasicLevels` are translated to equivalent
     * `CustomLevels`.
     */
    accessLevelFormat?: string;
    /**
     * Required. Resource name for the Access Level.  Format:
     * `accessPolicies/{policy_id}/accessLevels/{access_level_id}`
     */
    name?: string;
  }
  export interface Params$Resource$Accesspolicies$Accesslevels$List extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Whether to return `BasicLevels` in the Cloud Common Expression language,
     * as `CustomLevels`, rather than as `BasicLevels`. Defaults to returning
     * `AccessLevels` in the format they were defined.
     */
    accessLevelFormat?: string;
    /**
     * Number of Access Levels to include in the list. Default 100.
     */
    pageSize?: number;
    /**
     * Next page token for the next batch of Access Level instances. Defaults to
     * the first page of results.
     */
    pageToken?: string;
    /**
     * Required. Resource name for the access policy to list Access Levels from.
     * Format: `accessPolicies/{policy_id}`
     */
    parent?: string;
  }
  export interface Params$Resource$Accesspolicies$Accesslevels$Patch extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the Access Level. The `short_name` component
     * must begin with a letter and only include alphanumeric and '_'. Format:
     * `accessPolicies/{policy_id}/accessLevels/{short_name}`
     */
    name?: string;
    /**
     * Required.  Mask to control which fields get updated. Must be non-empty.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$AccessLevel;
  }


  export class Resource$Accesspolicies$Serviceperimeters {
    constructor() {}


    /**
     * accesscontextmanager.accessPolicies.servicePerimeters.create
     * @desc Create an Service Perimeter. The longrunning operation from this
     * RPC will have a successful status once the Service Perimeter has
     * propagated to long-lasting storage. Service Perimeters containing errors
     * will result in an error response for the first error encountered.
     * @alias accesscontextmanager.accessPolicies.servicePerimeters.create
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.parent Required. Resource name for the access policy which owns this Service Perimeter.  Format: `accessPolicies/{policy_id}`
     * @param {().ServicePerimeter} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    create(
        params?: Params$Resource$Accesspolicies$Serviceperimeters$Create,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    create(
        params: Params$Resource$Accesspolicies$Serviceperimeters$Create,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    create(
        params: Params$Resource$Accesspolicies$Serviceperimeters$Create,
        callback: BodyResponseCallback<Schema$Operation>): void;
    create(callback: BodyResponseCallback<Schema$Operation>): void;
    create(
        paramsOrCallback?:
            Params$Resource$Accesspolicies$Serviceperimeters$Create|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Serviceperimeters$Create;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Serviceperimeters$Create;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+parent}/servicePerimeters')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'POST'
            },
            options),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.servicePerimeters.delete
     * @desc Delete an Service Perimeter by resource name. The longrunning
     * operation from this RPC will have a successful status once the Service
     * Perimeter has been removed from long-lasting storage.
     * @alias accesscontextmanager.accessPolicies.servicePerimeters.delete
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. Resource name for the Service Perimeter.  Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    delete(
        params?: Params$Resource$Accesspolicies$Serviceperimeters$Delete,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    delete(
        params: Params$Resource$Accesspolicies$Serviceperimeters$Delete,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    delete(
        params: Params$Resource$Accesspolicies$Serviceperimeters$Delete,
        callback: BodyResponseCallback<Schema$Operation>): void;
    delete(callback: BodyResponseCallback<Schema$Operation>): void;
    delete(
        paramsOrCallback?:
            Params$Resource$Accesspolicies$Serviceperimeters$Delete|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Serviceperimeters$Delete;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Serviceperimeters$Delete;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'DELETE'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.servicePerimeters.get
     * @desc Get an Service Perimeter by resource name.
     * @alias accesscontextmanager.accessPolicies.servicePerimeters.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. Resource name for the Service Perimeter.  Format: `accessPolicies/{policy_id}/servicePerimeters/{service_perimeters_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(params?: Params$Resource$Accesspolicies$Serviceperimeters$Get,
        options?: MethodOptions): AxiosPromise<Schema$ServicePerimeter>;
    get(params: Params$Resource$Accesspolicies$Serviceperimeters$Get,
        options: MethodOptions|BodyResponseCallback<Schema$ServicePerimeter>,
        callback: BodyResponseCallback<Schema$ServicePerimeter>): void;
    get(params: Params$Resource$Accesspolicies$Serviceperimeters$Get,
        callback: BodyResponseCallback<Schema$ServicePerimeter>): void;
    get(callback: BodyResponseCallback<Schema$ServicePerimeter>): void;
    get(paramsOrCallback?: Params$Resource$Accesspolicies$Serviceperimeters$Get|
        BodyResponseCallback<Schema$ServicePerimeter>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ServicePerimeter>,
        callback?: BodyResponseCallback<Schema$ServicePerimeter>):
        void|AxiosPromise<Schema$ServicePerimeter> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Serviceperimeters$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Serviceperimeters$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$ServicePerimeter>(parameters, callback);
      } else {
        return createAPIRequest<Schema$ServicePerimeter>(parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.servicePerimeters.list
     * @desc List all Service Perimeters for an access policy.
     * @alias accesscontextmanager.accessPolicies.servicePerimeters.list
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {integer=} params.pageSize Number of Service Perimeters to include in the list. Default 100.
     * @param {string=} params.pageToken Next page token for the next batch of Service Perimeter instances. Defaults to the first page of results.
     * @param {string} params.parent Required. Resource name for the access policy to list Service Perimeters from.  Format: `accessPolicies/{policy_id}`
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    list(
        params?: Params$Resource$Accesspolicies$Serviceperimeters$List,
        options?: MethodOptions):
        AxiosPromise<Schema$ListServicePerimetersResponse>;
    list(
        params: Params$Resource$Accesspolicies$Serviceperimeters$List,
        options: MethodOptions|
        BodyResponseCallback<Schema$ListServicePerimetersResponse>,
        callback: BodyResponseCallback<Schema$ListServicePerimetersResponse>):
        void;
    list(
        params: Params$Resource$Accesspolicies$Serviceperimeters$List,
        callback: BodyResponseCallback<Schema$ListServicePerimetersResponse>):
        void;
    list(callback: BodyResponseCallback<Schema$ListServicePerimetersResponse>):
        void;
    list(
        paramsOrCallback?:
            Params$Resource$Accesspolicies$Serviceperimeters$List|
        BodyResponseCallback<Schema$ListServicePerimetersResponse>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$ListServicePerimetersResponse>,
        callback?: BodyResponseCallback<Schema$ListServicePerimetersResponse>):
        void|AxiosPromise<Schema$ListServicePerimetersResponse> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Serviceperimeters$List;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Serviceperimeters$List;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+parent}/servicePerimeters')
                       .replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['parent'],
        pathParams: ['parent'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$ListServicePerimetersResponse>(
            parameters, callback);
      } else {
        return createAPIRequest<Schema$ListServicePerimetersResponse>(
            parameters);
      }
    }


    /**
     * accesscontextmanager.accessPolicies.servicePerimeters.patch
     * @desc Update an Service Perimeter. The longrunning operation from this
     * RPC will have a successful status once the changes to the Service
     * Perimeter have propagated to long-lasting storage. Service Perimeter
     * containing errors will result in an error response for the first error
     * encountered.
     * @alias accesscontextmanager.accessPolicies.servicePerimeters.patch
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name Required. Resource name for the ServicePerimeter.  The `short_name` component must begin with a letter and only include alphanumeric and '_'. Format: `accessPolicies/{policy_id}/servicePerimeters/{short_name}`
     * @param {string=} params.updateMask Required. Mask to control which fields get updated. Must be non-empty.
     * @param {().ServicePerimeter} params.resource Request body data
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    patch(
        params?: Params$Resource$Accesspolicies$Serviceperimeters$Patch,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    patch(
        params: Params$Resource$Accesspolicies$Serviceperimeters$Patch,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    patch(
        params: Params$Resource$Accesspolicies$Serviceperimeters$Patch,
        callback: BodyResponseCallback<Schema$Operation>): void;
    patch(callback: BodyResponseCallback<Schema$Operation>): void;
    patch(
        paramsOrCallback?:
            Params$Resource$Accesspolicies$Serviceperimeters$Patch|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as
          Params$Resource$Accesspolicies$Serviceperimeters$Patch;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Accesspolicies$Serviceperimeters$Patch;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'PATCH'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Accesspolicies$Serviceperimeters$Create
      extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the access policy which owns this Service
     * Perimeter.  Format: `accessPolicies/{policy_id}`
     */
    parent?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ServicePerimeter;
  }
  export interface Params$Resource$Accesspolicies$Serviceperimeters$Delete
      extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the Service Perimeter.  Format:
     * `accessPolicies/{policy_id}/servicePerimeters/{service_perimeter_id}`
     */
    name?: string;
  }
  export interface Params$Resource$Accesspolicies$Serviceperimeters$Get extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the Service Perimeter.  Format:
     * `accessPolicies/{policy_id}/servicePerimeters/{service_perimeters_id}`
     */
    name?: string;
  }
  export interface Params$Resource$Accesspolicies$Serviceperimeters$List extends
      StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Number of Service Perimeters to include in the list. Default 100.
     */
    pageSize?: number;
    /**
     * Next page token for the next batch of Service Perimeter instances.
     * Defaults to the first page of results.
     */
    pageToken?: string;
    /**
     * Required. Resource name for the access policy to list Service Perimeters
     * from.  Format: `accessPolicies/{policy_id}`
     */
    parent?: string;
  }
  export interface Params$Resource$Accesspolicies$Serviceperimeters$Patch
      extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * Required. Resource name for the ServicePerimeter.  The `short_name`
     * component must begin with a letter and only include alphanumeric and '_'.
     * Format: `accessPolicies/{policy_id}/servicePerimeters/{short_name}`
     */
    name?: string;
    /**
     * Required. Mask to control which fields get updated. Must be non-empty.
     */
    updateMask?: string;

    /**
     * Request body metadata
     */
    requestBody?: Schema$ServicePerimeter;
  }



  export class Resource$Operations {
    constructor() {}


    /**
     * accesscontextmanager.operations.get
     * @desc Gets the latest state of a long-running operation.  Clients can use
     * this method to poll the operation result at intervals as recommended by
     * the API service.
     * @alias accesscontextmanager.operations.get
     * @memberOf! ()
     *
     * @param {object} params Parameters for request
     * @param {string} params.name The name of the operation resource.
     * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
     * @param {callback} callback The callback that handles the response.
     * @return {object} Request object
     */
    get(params?: Params$Resource$Operations$Get,
        options?: MethodOptions): AxiosPromise<Schema$Operation>;
    get(params: Params$Resource$Operations$Get,
        options: MethodOptions|BodyResponseCallback<Schema$Operation>,
        callback: BodyResponseCallback<Schema$Operation>): void;
    get(params: Params$Resource$Operations$Get,
        callback: BodyResponseCallback<Schema$Operation>): void;
    get(callback: BodyResponseCallback<Schema$Operation>): void;
    get(paramsOrCallback?: Params$Resource$Operations$Get|
        BodyResponseCallback<Schema$Operation>,
        optionsOrCallback?: MethodOptions|
        BodyResponseCallback<Schema$Operation>,
        callback?: BodyResponseCallback<Schema$Operation>):
        void|AxiosPromise<Schema$Operation> {
      let params = (paramsOrCallback || {}) as Params$Resource$Operations$Get;
      let options = (optionsOrCallback || {}) as MethodOptions;

      if (typeof paramsOrCallback === 'function') {
        callback = paramsOrCallback;
        params = {} as Params$Resource$Operations$Get;
        options = {};
      }

      if (typeof optionsOrCallback === 'function') {
        callback = optionsOrCallback;
        options = {};
      }

      const rootUrl =
          options.rootUrl || 'https://accesscontextmanager.googleapis.com/';
      const parameters = {
        options: Object.assign(
            {
              url: (rootUrl + '/v1beta/{+name}').replace(/([^:]\/)\/+/g, '$1'),
              method: 'GET'
            },
            options),
        params,
        requiredParams: ['name'],
        pathParams: ['name'],
        context
      };
      if (callback) {
        createAPIRequest<Schema$Operation>(parameters, callback);
      } else {
        return createAPIRequest<Schema$Operation>(parameters);
      }
    }
  }

  export interface Params$Resource$Operations$Get extends StandardParameters {
    /**
     * Auth client or API Key for the request
     */
    auth?: string|OAuth2Client|JWT|Compute|UserRefreshClient;

    /**
     * The name of the operation resource.
     */
    name?: string;
  }
}