cmd_Release/obj.target/oracle_bindings/src/oracle_bindings.o := g++ '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DBUILDING_NODE_EXTENSION' -I/root/.node-gyp/0.10.29/src -I/root/.node-gyp/0.10.29/deps/uv/include -I/root/.node-gyp/0.10.29/deps/v8/include -I/opt/instantclient/instantclient_11_1/sdk/include  -fPIC -Wall -Wextra -Wno-unused-parameter -pthread -m64 -O2 -fno-strict-aliasing -fno-tree-vrp -fno-tree-sink -fno-omit-frame-pointer -fno-rtti -MMD -MF ./Release/.deps/Release/obj.target/oracle_bindings/src/oracle_bindings.o.d.raw  -c -o Release/obj.target/oracle_bindings/src/oracle_bindings.o ../src/oracle_bindings.cpp
Release/obj.target/oracle_bindings/src/oracle_bindings.o: \
 ../src/oracle_bindings.cpp ../src/connection.h \
 /root/.node-gyp/0.10.29/deps/v8/include/v8.h \
 /root/.node-gyp/0.10.29/deps/v8/include/v8stdint.h \
 /root/.node-gyp/0.10.29/src/node.h \
 /root/.node-gyp/0.10.29/deps/uv/include/uv.h \
 /root/.node-gyp/0.10.29/deps/uv/include/uv-private/uv-unix.h \
 /root/.node-gyp/0.10.29/deps/uv/include/uv-private/ngx-queue.h \
 /root/.node-gyp/0.10.29/deps/uv/include/uv-private/uv-linux.h \
 /root/.node-gyp/0.10.29/src/node_object_wrap.h \
 /root/.node-gyp/0.10.29/src/node.h \
 /root/.node-gyp/0.10.29/src/node_buffer.h \
 /opt/instantclient/instantclient_11_1/sdk/include/occi.h \
 /opt/instantclient/instantclient_11_1/sdk/include/occiCommon.h \
 /opt/instantclient/instantclient_11_1/sdk/include/oci.h \
 /opt/instantclient/instantclient_11_1/sdk/include/oratypes.h \
 /opt/instantclient/instantclient_11_1/sdk/include/ocidfn.h \
 /opt/instantclient/instantclient_11_1/sdk/include/oci1.h \
 /opt/instantclient/instantclient_11_1/sdk/include/oro.h \
 /opt/instantclient/instantclient_11_1/sdk/include/ori.h \
 /opt/instantclient/instantclient_11_1/sdk/include/ort.h \
 /opt/instantclient/instantclient_11_1/sdk/include/orl.h \
 /opt/instantclient/instantclient_11_1/sdk/include/ociextp.h \
 /opt/instantclient/instantclient_11_1/sdk/include/ociapr.h \
 /opt/instantclient/instantclient_11_1/sdk/include/ociap.h \
 /opt/instantclient/instantclient_11_1/sdk/include/nzt.h \
 /opt/instantclient/instantclient_11_1/sdk/include/nzerror.h \
 /opt/instantclient/instantclient_11_1/sdk/include/ocixmldb.h \
 /opt/instantclient/instantclient_11_1/sdk/include/oci8dp.h \
 /opt/instantclient/instantclient_11_1/sdk/include/occiData.h \
 /opt/instantclient/instantclient_11_1/sdk/include/occiControl.h \
 /opt/instantclient/instantclient_11_1/sdk/include/occiObjects.h \
 /opt/instantclient/instantclient_11_1/sdk/include/occiAQ.h \
 ../src/utils.h ../src/executeBaton.h \
 /root/.node-gyp/0.10.29/src/node_object_wrap.h ../src/oracle_bindings.h \
 ../src/statement.h ../src/statementBaton.h ../src/reader.h \
 ../src/readerBaton.h ../src/outParam.h
../src/oracle_bindings.cpp:
../src/connection.h:
/root/.node-gyp/0.10.29/deps/v8/include/v8.h:
/root/.node-gyp/0.10.29/deps/v8/include/v8stdint.h:
/root/.node-gyp/0.10.29/src/node.h:
/root/.node-gyp/0.10.29/deps/uv/include/uv.h:
/root/.node-gyp/0.10.29/deps/uv/include/uv-private/uv-unix.h:
/root/.node-gyp/0.10.29/deps/uv/include/uv-private/ngx-queue.h:
/root/.node-gyp/0.10.29/deps/uv/include/uv-private/uv-linux.h:
/root/.node-gyp/0.10.29/src/node_object_wrap.h:
/root/.node-gyp/0.10.29/src/node.h:
/root/.node-gyp/0.10.29/src/node_buffer.h:
/opt/instantclient/instantclient_11_1/sdk/include/occi.h:
/opt/instantclient/instantclient_11_1/sdk/include/occiCommon.h:
/opt/instantclient/instantclient_11_1/sdk/include/oci.h:
/opt/instantclient/instantclient_11_1/sdk/include/oratypes.h:
/opt/instantclient/instantclient_11_1/sdk/include/ocidfn.h:
/opt/instantclient/instantclient_11_1/sdk/include/oci1.h:
/opt/instantclient/instantclient_11_1/sdk/include/oro.h:
/opt/instantclient/instantclient_11_1/sdk/include/ori.h:
/opt/instantclient/instantclient_11_1/sdk/include/ort.h:
/opt/instantclient/instantclient_11_1/sdk/include/orl.h:
/opt/instantclient/instantclient_11_1/sdk/include/ociextp.h:
/opt/instantclient/instantclient_11_1/sdk/include/ociapr.h:
/opt/instantclient/instantclient_11_1/sdk/include/ociap.h:
/opt/instantclient/instantclient_11_1/sdk/include/nzt.h:
/opt/instantclient/instantclient_11_1/sdk/include/nzerror.h:
/opt/instantclient/instantclient_11_1/sdk/include/ocixmldb.h:
/opt/instantclient/instantclient_11_1/sdk/include/oci8dp.h:
/opt/instantclient/instantclient_11_1/sdk/include/occiData.h:
/opt/instantclient/instantclient_11_1/sdk/include/occiControl.h:
/opt/instantclient/instantclient_11_1/sdk/include/occiObjects.h:
/opt/instantclient/instantclient_11_1/sdk/include/occiAQ.h:
../src/utils.h:
../src/executeBaton.h:
/root/.node-gyp/0.10.29/src/node_object_wrap.h:
../src/oracle_bindings.h:
../src/statement.h:
../src/statementBaton.h:
../src/reader.h:
../src/readerBaton.h:
../src/outParam.h:
