## Lab X - JBoss Fuse mBaaS Service

1. Go to **Services & APIs**
2. Click on **Provision mBaaS Service/API** to create a new service
3. Click on **New mBaaS Service**, name the service **JBoss Fuse xPaaS** and click on **Next**
4. Go to **Environment Variables** section and add the following variables with sensible default values:
  * XPAAS_AMQ_HOST
	* XPAAS_AMQ_STOMP_PORT
	* XPAAS_AMQ_USERNAME
	* XPAAS_AMQ_PASSWORD
  * XPAAS_AMQ_DESTINATION
  * XPAAS_AMQ_CALLBACK

4. Go to the **Editor** section of the service
5. Modify **application.js** and replace the following line:
  ```javascript
  app.use('/hello', require('./lib/hello.js')());
  ```
  with
  ```javascript
  app.use('/fuse', require('./lib/fuse.js')());
  ```

9. Create a new file called **fuse.js** in the **lib** folder with the following content:

  ```javascript
  ```


## Appendix A - Provision JBoss A-MQ xPaaS on OpenShift

1. Login into OpenShift and create a JBoss Fuse gear
2. Login into **Fuse Management Console** and unser **Runtime**/**MQ** tab click on **Create Broker Configuration**
3. Specify a name e.g. fhamq, choose **Standalone** as type and click on **Create Broker**
4. Click on **mq-broker-default.fhamq** in order to go the profile. Note that the profile name would be different if you chose a different name for the broker.
5. Create a new XML file called **fhbroker.xml** in the profile by clicking on **Create** and picking **XML Document**
6. Edit **fhbroker.xml** and paste the following content in it:
  ```xml
  <beans
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:amq="http://activemq.apache.org/schema/core"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
    http://activemq.apache.org/schema/core http://activemq.apache.org/schema/core/activemq-core.xsd">

      <!-- Allows us to use system properties and fabric as variables in this configuration file -->
      <bean class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
          <property name="properties">
              <bean class="org.fusesource.mq.fabric.ConfigurationProperties"/>
          </property>
      </bean>

      <bean id="addressPolicy" class="org.apache.activemq.broker.PublishedAddressPolicy">
          <property name="portMapping">
            <map>
              <entry key="${bindPort}" value="${connectionPort}"/>
            </map>
          </property>
      </bean>

      <broker xmlns="http://activemq.apache.org/schema/core" brokerName="${broker-name}" dataDirectory="${data}" start="false">

          <destinationPolicy>
              <policyMap>
                <policyEntries>
                  <policyEntry topic=">" producerFlowControl="true">
                    <pendingMessageLimitStrategy>
                      <constantPendingMessageLimitStrategy limit="1000"/>
                    </pendingMessageLimitStrategy>
                  </policyEntry>
                  <policyEntry queue=">" producerFlowControl="true" memoryLimit="1mb">
                  </policyEntry>
                </policyEntries>
              </policyMap>
          </destinationPolicy>

          <managementContext>
              <managementContext createConnector="false"/>
          </managementContext>

          <persistenceAdapter>
              <kahaDB directory="${data}/kahadb"/>
          </persistenceAdapter>

          <plugins>
              <jaasAuthenticationPlugin configuration="karaf" />
          </plugins>

          <systemUsage>
              <systemUsage>
                  <memoryUsage>
                      <memoryUsage limit="64 mb"/>
                  </memoryUsage>
                  <storeUsage>
                      <storeUsage limit="100 gb"/>
                  </storeUsage>
                  <tempUsage>
                      <tempUsage limit="50 gb"/>
                  </tempUsage>
              </systemUsage>
          </systemUsage>

          <transportConnectors>
              <transportConnector name="openwire" publishedAddressPolicy="#addressPolicy" uri="tcp://${bindAddress}:${bindPort}"/>
  		    <transportConnector name="stomp" publishedAddressPolicy="#addressPolicy" uri="stomp://${OPENSHIFT_FUSE_IP}:31613"/>
  		    <transportConnector name="websocket" publishedAddressPolicy="#addressPolicy" uri="ws://${OPENSHIFT_FUSE_IP}:31614"/>
          </transportConnectors>
      </broker>

  </beans>
  ```

7. Edit **org.fusesource.mq.fabric.server-fhamq.properties** and replace the following line

  ```
  config = profile:broker.xml
  ```

  with

  ```
  config = profile:fhbroker.xml
  ```

  Note that the name of the properties file would be different if you chose a different name for the broker.

8. Go to **Runtime**/**MQ** tab and click on the red triangle to create a broker container for the new profile. Preferably choose **large** gear profile.

9. Specify a name and click on **Create and Start the Container**. A new container will show up in the list containers with the new broker profile assigned to it.

10.































1. New Project -> AngularJS Hello World Project
2. Next -> Finish
3. Navigate to Git Quickstarts
4. Clone the cloud app to ./triply-cloud-app

git clone git@redhat-demos-t.sandbox.feedhenry.com:redhat-demos-t/Triply-Test-Cloud-App.git triply-cloud-app

5. Clone the client app to ./triply-cordova

git clone git@redhat-demos-t.sandbox.feedhenry.com:redhat-demos-t/Triply-Test-AngularJS-Hello-World-Client.git triply-cordova

6. Clone the github repo

 git clone https://github.com/siamaksade/triply-feedhenry-polymer.git /tmp/github-triply

7. Copy the apps over the cloned FeedHenry apps

cp -r /tmp/github-triply/frontend/ ./triply-cordova/
cp -r /tmp/github-triply/backend/ ./triply-cloud-app/

8. Repeat the following for each app to push the changes to the git repo

cd triply-cloud-app
git add .
git commit -a -m "cloud app added"
git push origin master

cd triply-cordova
git add .
git commit -a -m "cloud app added"
git push origin master

9. In FeedHenry Studio, click on "Apps, Cloud Apps and Services"

10. Click on "+" in the "mBaaS Services" column

11. Select "Twilio" and click on "Associate Services". Now you should have one app/service in each column.

[PIC apps.png]

12. Verify the app works.
