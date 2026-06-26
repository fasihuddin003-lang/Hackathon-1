# ماڈیول 1: روبوٹک نروس سسٹم (ROS 2)

**فوکس: روبوٹ کنٹرول کے لیے مڈل ویئر۔**

## جائزہ

ROS 2 (روبوٹ آپریٹنگ سسٹم 2) روبوٹ کے نروس سسٹم کے طور پر کام کرتا ہے۔ یہ کمیونیکیشن انفراسٹرکچر فراہم کرتا ہے جو روبوٹ کے مختلف حصوں — سینسرز، ایکچیویٹرز اور AI ایجنٹس — کو ایک دوسرے سے بات کرنے کی اجازت دیتا ہے۔

## کلیدی تصورات

### ROS 2 نوڈس

نوڈ ایک پروسیس ہے جو کمپیوٹیشن انجام دیتا ہے۔ روبوٹ کئی نوڈس پر مشتمل ہوتے ہیں جو ایک دوسرے سے کمیونیکیٹ کرتے ہیں۔ مثال کے طور پر:
- ایک کیمرہ نوڈ امیج ڈیٹا پبلش کرتا ہے
- ایک وژن نوڈ امیجز پروسیس کرتا ہے اور آبجیکٹ ڈیٹیکشن پبلش کرتا ہے
- ایک موٹر کنٹرولر نوڈ موومنٹ کمانڈز سبسکرائب کرتا ہے

### ٹاپکس

ٹاپکس وہ بسز ہیں جن پر نوڈس میسیجز کا تبادلہ کرتے ہیں۔ یہ publish-subscribe پیٹرن پر عمل کرتے ہیں:
- **پبلشرز** ایک ٹاپک پر ڈیٹا بھیجتے ہیں
- **سبسکرائبرز** ایک ٹاپک سے ڈیٹا وصول کرتے ہیں

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello from ROS 2!'
        self.publisher.publish(msg)
```

### سروسز

سروسز request-response پیٹرن پر عمل کرتی ہیں، ان کاموں کے لیے مفید ہیں جن میں جواب کی ضرورت ہوتی ہے:
- ایک نوڈ درخواست بھیجتا ہے
- دوسرا نوڈ اسے پروسیس کر کے جواب بھیجتا ہے

### ایکشنز

ایکشنز طویل مدتی کاموں کے لیے ہیں جن میں فیڈبیک کی ضرورت ہوتی ہے:
- گول: آپ کیا حاصل کرنا چاہتے ہیں
- فیڈبیک: پیشرفت کی اپڈیٹس
- نتیجہ: حتمی نتیجہ

## Python ایجنٹس کو ROS کنٹرولرز سے جوڑنا (rclpy)

`rclpy` ROS 2 کے لیے Python کلائنٹ لائبریری ہے۔ یہ Python-based AI ایجنٹس کو براہ راست ROS 2 کنٹرولرز سے انٹرفیس کرنے کی اجازت دیتی ہے:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class AIAgent(Node):
    def __init__(self):
        super().__init__('ai_agent')
        self.cmd_pub = self.create_publisher(Twist, '/cmd_vel', 10)

    def send_movement_command(self, linear_x, angular_z):
        cmd = Twist()
        cmd.linear.x = linear_x
        cmd.angular.z = angular_z
        self.cmd_pub.publish(cmd)
```

## URDF (یونیفائیڈ روبوٹ ڈیسکرپشن فارمیٹ)

URDF روبوٹ ماڈل کو بیان کرنے کے لیے ایک XML فارمیٹ ہے:
- لنکس (سخت اجسام)
- جوائنٹس (لنکس کے درمیان کنکشن)
- کائنی میٹکس (جوائنٹس کیسے حرکت کرتے ہیں)

```xml
<robot name="simple_robot">
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.4 0.4 0.1"/>
      </geometry>
    </visual>
  </link>
  <joint name="base_to_wheel" type="continuous">
    <parent link="base_link"/>
    <child link="wheel"/>
    <origin xyz="0.2 0 0"/>
  </joint>
</robot>
```

## خلاصہ

ROS 2 جدید روبوٹکس کے لیے کمیونیکیشن بیک بون فراہم کرتا ہے۔ نوڈس، ٹاپکس، سروسز اور URDF میں مہارت حاصل کرنا کسی بھی روبوٹک سسٹم کی تعمیر کے لیے ضروری ہے۔
