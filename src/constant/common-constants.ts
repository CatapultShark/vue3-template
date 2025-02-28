export const FIELD_MAP = {
  HandleHttpRequest: [
    {
      property: 'Listening Port',
      value: '80',
      isDefault: true
    },
    {
      property: 'Hostname',
      value: '',
      isDefault: true
    },
    {
      property: 'SSL Context Service',
      value: '',
      isDefault: true
    },
    {
      property: 'HTTP Context Map',
      value: '',
      isDefault: true
    },
    {
      property: 'Allowed Paths',
      value: '/test-path',
      isDefault: true
    },
    {
      property: 'Default URL Character Set',
      value: 'UTF-8',
      isDefault: true
    },
    {
      property: 'Allow GET',
      value: 'true',
      isDefault: true
    },
    {
      property: 'Allow POST',
      value: 'true',
      isDefault: true
    },
    {
      property: 'Allow PUT',
      value: 'true',
      isDefault: true
    },
    {
      property: 'Allow DELETE',
      value: 'true',
      isDefault: true
    },
    {
      property: 'Allow HEAD',
      value: 'false',
      isDefault: true
    },
    {
      property: 'Allow OPTIONS',
      value: 'false',
      isDefault: true
    },
    {
      property: 'Maximum Threads',
      value: '200',
      isDefault: true
    },
    {
      property: 'Additional HTTP Methods',
      value: '',
      isDefault: true
    },
    {
      property: 'Client Authentication',
      value: 'No Authentication',
      isDefault: true
    },
    {
      property: 'Container Queue Size',
      value: '50',
      isDefault: true
    },
    {
      property: 'Multipart Request Max Size',
      value: '1 MB',
      isDefault: true
    },
    {
      property: 'Multipart Read Buffer Size',
      value: '512 KB',
      isDefault: true
    },
    {
      property: 'Parameters to Attributes List',
      value: '',
      isDefault: true
    }
  ],
  ExecuteSQL: [
    {
      property: 'Database Connection Pooling Service',
      value: '',
      isDefault: true
    },
    {
      property: 'SQL Pre-Query',
      value: '',
      isDefault: true
    },
    {
      property: 'SQL select query',
      value: 'select * form user',
      isDefault: true
    },
    {
      property: 'SQL Post-Query',
      value: '',
      isDefault: true
    },
    {
      property: 'Max Wait Time',
      value: '0 seconds',
      isDefault: true
    },
    {
      property: 'Normalize Table/Column Names',
      value: 'false',
      isDefault: true
    },
    {
      property: 'Use Avro Logical Types',
      value: 'false',
      isDefault: true
    },
    {
      property: 'Compression Format',
      value: 'None',
      isDefault: true
    },
    {
      property: 'Default Decimal Precision',
      value: '0',
      isDefault: true
    },
    {
      property: 'Default Decimal Scale',
      value: '0',
      isDefault: true
    },
    {
      property: 'Output Batch Size',
      value: '0',
      isDefault: true
    },
    {
      property: 'Fetch Size',
      value: '0',
      isDefault: true
    },
    {
      property: 'Set Auto Commit',
      value: 'true',
      isDefault: true
    }
  ],
  ConvertAvroToJSON: [
    {
      property: 'JSON container options',
      value: 'array',
      isDefault: true
    },
    {
      property: 'ConvertAvro Option',
      value: JSON.stringify({
        name: 'Kylin',
        age: 25,
        address: {
          location: 'HangZhou',
          zip: '10001'
        },
        contact: {
          email: 'alice.smith@example.com',
          phone: '123-456-7890'
        }
      }),
      isDefault: true
    },
    {
      property: 'Wrap Single Record',
      value: 'false',
      isDefault: true
    },
    {
      property: 'Avro schema',
      value: '',
      isDefault: true
    }
  ],
  JoltTransformJSON: [
    {
      property: 'Jolt Transformation DSL',
      value: 'Chain',
      isDefault: true
    },
    {
      property: 'Custom Transformation Class Name',
      value: '',
      isDefault: true
    },
    {
      property: 'Custom Module Directory',
      value: '',
      isDefault: true
    },
    {
      property: 'Jolt Specification',
      value:
        '[\n' +
        '  {\n' +
        '    "operation": "shift",\n' +
        '    "spec": {\n' +
        '      "name": "username",\n' +
        '      "age": "age",\n' +
        '      "address": {\n' +
        '        "location": "city"\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        ']',
      isDefault: true
    },
    {
      property: 'Transform Cache Size',
      value: '1',
      isDefault: true
    },
    {
      property: 'Pretty Print',
      value: 'false',
      isDefault: true
    }
  ],
  HandleHttpResponse: [
    {
      property: 'HTTP Status Code',
      value: '',
      isDefault: true
    },
    {
      property: 'HTTP Context Map',
      value: '',
      isDefault: true
    },
    {
      property: 'Attributes to add to the HTTP Response (Regex)',
      value: '',
      isDefault: true
    }
  ]
};
