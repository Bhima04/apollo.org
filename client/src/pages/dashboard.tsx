import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SiCisco } from "react-icons/si";

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Profile Section */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/hexacomm-logo.png" alt="Hexacomm" />
                <AvatarFallback>
                  <SiCisco className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold">Hexacomm Technology</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-center text-gray-600 mb-6">
              Pionir dalam solusi telekomunikasi dan IoT di Indonesia
            </p>
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Tentang Kami</h3>
              <p>
                Hexacomm adalah perusahaan teknologi yang berfokus pada pengembangan infrastruktur
                telekomunikasi dan solusi IoT. Dengan pengalaman lebih dari 10 tahun, kami telah
                membantu berbagai organisasi dalam transformasi digital mereka.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Telecommunications Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Evolusi Teknologi Telekomunikasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">1G ke 6G: Perjalanan Revolusi Digital</h3>

              <div className="space-y-2">
                <h4 className="font-medium">1G (1980-an)</h4>
                <p className="text-gray-600">
                  Awal mula teknologi seluler analog untuk panggilan suara.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">2G (1990-an)</h4>
                <p className="text-gray-600">
                  Era digital dengan SMS dan transfer data sederhana.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">3G (2000-an)</h4>
                <p className="text-gray-600">
                  Memperkenalkan mobile internet dan video call.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">4G/LTE (2010-an)</h4>
                <p className="text-gray-600">
                  Revolusi broadband mobile dengan kecepatan tinggi.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">5G (Sekarang)</h4>
                <p className="text-gray-600">
                  Ultra-low latency, massive IoT, dan enhanced mobile broadband.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">6G (Masa Depan)</h4>
                <p className="text-gray-600">
                  Integrasi AI, holografik, dan komunikasi quantum.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IoT Solutions */}
        <Card>
          <CardHeader>
            <CardTitle>Solusi IoT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Hexacomm menyediakan solusi IoT komprehensif untuk berbagai industri:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Smart City Infrastructure</li>
              <li>Industrial IoT & Automation</li>
              <li>Agricultural IoT Solutions</li>
              <li>Healthcare Monitoring Systems</li>
              <li>Smart Building Management</li>
              <li>Environmental Monitoring</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}